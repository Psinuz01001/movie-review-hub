import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1 className="favorites-title">Favorites</h1>
        <button className="close-button" onClick={() => navigate(-1)}>×</button>
      </div>

      {favorites.length === 0 ? (
        <p className="empty-message">Вы ещё не добавили фильмы в избранное.</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <Link to={`/movie/${movie.id}`} className="movie-link" key={movie.id}>
              <div className="movie-card">
                <img
                  className="movie-poster"
                  src={movie.poster || "/placeholder.png"}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-meta">ID: {movie.id}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
