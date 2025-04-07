import React from "react";
import { motion } from "framer-motion";

const MovieCard = React.memo(({ movie }) => {
  return (
    <motion.div
      className="movie-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">
          {movie.genre !== "Неизвестно" ? `${movie.genre} • ${movie.year}` : movie.year}
        </p>
      </div>
    </motion.div>
  );
});

export default MovieCard;
