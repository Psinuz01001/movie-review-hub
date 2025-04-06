import React from "react";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { id } = useParams(); // Extract the movie ID from the URL parameters

  return (
    <div>
      <h1>Movie Details for ID: {id}</h1>
      {/* Here you would typically fetch and display movie details using the ID */}
    </div>
  );
}

export default MovieDetailsPage;
// This component uses the `useParams` hook from `react-router-dom` to extract the movie ID from the URL and display it.