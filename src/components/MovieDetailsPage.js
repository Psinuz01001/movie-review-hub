import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPopularMovies } from "../services/movieService";
import { motion } from "framer-motion";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const load = async () => {
      const movies = await fetchPopularMovies();
      const found = movies.find((m) => m.id === parseInt(id));
      setMovie(found);
    };
    load();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <motion.div
      className="movie-details"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <img src={movie.poster} alt={movie.title} className="details-poster" />
      <h2>{movie.title}</h2>
      <p className="overview">{movie.overview}</p>
      <p><strong>Жанр:</strong> {movie.genre}</p>
      <p><strong>Год:</strong> {movie.year}</p>
    </motion.div>
  );
};

export default MovieDetailsPage;
