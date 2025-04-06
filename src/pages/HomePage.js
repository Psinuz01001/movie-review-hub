// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Симуляция получения списка фильмов (можно позже заменить на API)
  useEffect(() => {
    // Симулируем задержку (например, 1 секунда)
    setTimeout(() => {
      // Пример данных
      const sampleMovies = [
        { id: 1, title: "Inception", genre: "Sci-Fi", year: "2010", poster: "https://via.placeholder.com/150", overview: "A mind-bending thriller" },
        { id: 2, title: "The Godfather", genre: "Crime", year: "1972", poster: "https://via.placeholder.com/150", overview: "Epic mafia drama" },
        { id: 3, title: "Interstellar", genre: "Sci-Fi", year: "2014", poster: "https://via.placeholder.com/150", overview: "Journey across space and time" },
      ];
      setMovies(sampleMovies);
    }, 1000);
  }, []);

  // Фильтрация по названию
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <h2>Movie Review Hub</h2>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
