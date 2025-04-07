// === HomePage.js ===
import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import {
  fetchPopularMovies,
  fetchMovieTrailer,
  fetchMovieDetails
} from "../services/movieService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { prefetchComponent } from "../utils/prefetchComponent";
import { preloadMovieDetails } from "../utils/cache";

const MovieCard = lazy(() => import("../components/MovieCard"));
const MovieDetailsPageImport = () => import("../pages/MovieDetailsPage");

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const results = await fetchPopularMovies(page);
      setMovies((prev) => [...prev, ...results]);
      setLoading(false);
    };
    load();
  }, [page]);

  useEffect(() => {
    const filtered = searchTerm.trim()
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : movies;
    setDisplayedMovies(filtered);
  }, [movies, searchTerm]);

  const featuredMovie = useMemo(
    () => (displayedMovies.length > 0 ? displayedMovies[0] : null),
    [displayedMovies]
  );

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handleWatchTrailer = useCallback(async () => {
    if (!featuredMovie) return;
    const url = await fetchMovieTrailer(featuredMovie.id);
    setTrailerUrl(url);
    setShowTrailer(true);
  }, [featuredMovie]);

  const closeTrailer = useCallback(() => {
    setShowTrailer(false);
    setTrailerUrl(null);
  }, []);

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {featuredMovie && (
        <motion.div
          className="hero-banner"
          style={{
            backgroundImage: `url(${featuredMovie.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-overlay">
            <h1 className="hero-title">{featuredMovie.title}</h1>
            <p className="hero-overview">{featuredMovie.overview}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link to={`/movie/${featuredMovie.id}`}>
                <button className="hero-button">Подробнее</button>
              </Link>
              <button className="hero-button" onClick={handleWatchTrailer}>
                Смотреть трейлер
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showTrailer && trailerUrl && (
        <div className="trailer-modal">
          <div className="trailer-content">
            <button className="close-button" onClick={closeTrailer}>
              ×
            </button>
            <iframe
              width="100%"
              height="400"
              src={trailerUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search movies..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="movie-list">
        <Suspense fallback={<div>Загрузка карточек...</div>}>
          {displayedMovies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-link"
              onMouseEnter={() => {
                prefetchComponent(MovieDetailsPageImport);
                preloadMovieDetails(movie.id, fetchMovieDetails);
              }}
            >
              <MovieCard movie={movie} />
            </Link>
          ))}
        </Suspense>
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={handleLoadMore} className="hero-button">
          Загрузить ещё
        </button>
      </div>
    </motion.div>
  );
};

export default HomePage;