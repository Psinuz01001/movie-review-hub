// === MovieDetailsPage.js ===
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchSimilarMovies
} from "../services/movieService";
import { getCachedMovie, cacheMovie, preloadMovieDetails } from "../utils/cache";
import { motion } from "framer-motion";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [omdbData, setOmdbData] = useState(null);

  useEffect(() => {
    const cached = getCachedMovie(id);
    if (cached) {
      setMovie(cached);
    } else {
      const loadMovie = async () => {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        cacheMovie(id, data);
      };
      loadMovie();
    }

    const loadExtras = async () => {
      const similar = await fetchSimilarMovies(id);
      setSimilarMovies(similar);

      if (movie?.title) {
        const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${process.env.REACT_APP_OMDB_KEY}`);
        const json = await res.json();
        if (json && json.Response !== "False") {
          setOmdbData(json);
        }
      }
    };

    loadExtras();
  }, [id, movie?.title]);

  const handleWatchTrailer = async () => {
    const url = await fetchMovieTrailer(id);
    if (url) {
      setTrailerUrl(url);
      setShowTrailer(true);
    }
  };

  const handleToggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = saved.find((f) => f.id === movie.id);

    let updated;
    if (exists) {
      updated = saved.filter((f) => f.id !== movie.id);
    } else {
      updated = [
        ...saved,
        {
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path || movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`
            : null,
        },
      ];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div className="movie-details">Загрузка...</div>;

  return (
    <motion.div
      className="movie-details"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="movie-banner"
        style={{
          backgroundImage: `url(${movie.backdrop_path || movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}` : null})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="movie-banner-overlay">
          <button className="card-close" onClick={() => navigate(-1)}>×</button>
          <h1>{movie.title}</h1>
          <p className="movie-genres">
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="movie-release">{movie.release_date}</p>
          <p className="movie-overview">{movie.overview}</p>

          {omdbData && (
            <div className="omdb-info">
              <p><strong>IMDb:</strong> {omdbData.imdbRating} / 10</p>
              <p><strong>Runtime:</strong> {omdbData.Runtime}</p>
              <p><strong>Actors:</strong> {omdbData.Actors}</p>
              <p><strong>Country:</strong> {omdbData.Country}</p>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="hero-button" onClick={handleWatchTrailer}>
              Смотреть трейлер
            </button>
            <button className={`hero-button ${isFavorite ? 'remove-fav' : 'add-fav'}`} onClick={handleToggleFavorite}>
              {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            </button>
          </div>
        </div>
      </div>

      {showTrailer && trailerUrl && (
        <div className="trailer-modal">
          <div className="trailer-content">
            <button
              className="close-button"
              onClick={() => setShowTrailer(false)}
            >
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

      {similarMovies.length > 0 && (
        <div className="similar-section">
          <h2>Похожие фильмы</h2>
          <div className="movie-list">
            {similarMovies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-link"
                onMouseEnter={() => preloadMovieDetails(movie.id, fetchMovieDetails)}
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MovieDetailsPage;
