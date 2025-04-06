// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      const results = await fetchPopularMovies();
      setMovies(results);
    };
    loadMovies();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      
      <input
        type="text"
        placeholder="Search magical movies..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-link">
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
