// === MovieDetailsPage.js ===
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieTrailer,
} from "../services/movieService";


const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);

      const saved = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(saved.some((f) => f.id === data.id));
    };
    loadMovie();
  }, [id]);

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
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`,
        },
      ];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div className="movie-details">Загрузка...</div>;

  return (
    <div className="movie-details">
      <div
        className="movie-banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
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
    </div>
  );
};

export default MovieDetailsPage;
