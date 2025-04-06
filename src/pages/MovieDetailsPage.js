// src/pages/MovieDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  // Симулируем загрузку данных для конкретного фильма
  useEffect(() => {
    // В реальном проекте здесь делаем запрос к API, а пока - пример:
    const sampleMovie = {
      id: id,
      title: "Sample Movie",
      genre: "Drama",
      year: "2020",
      poster: "https://via.placeholder.com/150",
      overview: "Описание фильма..."
    };
    setMovie(sampleMovie);
  }, [id]);

  // Функция для добавления отзыва
  const handleAddReview = () => {
    if (newReview.trim() === '') return;
    const review = {
      id: Date.now(),
      content: newReview,
      date: new Date().toLocaleString()
    };
    setReviews([...reviews, review]);
    setNewReview('');
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <p>{movie.overview}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Year:</strong> {movie.year}</p>

      <hr />
      <h3>Reviews</h3>
      <div className="reviews">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review">
              <p>{review.content}</p>
              <small>{review.date}</small>
            </div>
          ))
        )}
      </div>
      <div className="review-form">
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button onClick={handleAddReview}>Add Review</button>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
