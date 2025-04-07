// src/services/movieService.js

const API_KEY = "037fdfae5cb6ddb03d50acc055168988";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export async function fetchPopularMovies(pages = 3) {
  try {
    const allResults = [];

    for (let page = 1; page <= pages; page++) {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();
      allResults.push(...data.results);
    }

    // Удаляем дубликаты по ID
    const uniqueMovies = Array.from(
      new Map(allResults.map((m) => [m.id, m])).values()
    );

    return uniqueMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: `${IMAGE_BASE}${movie.backdrop_path || movie.poster_path}`,
      genre: "Fantasy",
      year: movie.release_date?.split("-")[0] || "N/A",
    }));
  } catch (error) {
    console.error("Ошибка при получении фильмов:", error);
    return [];
  }
}
export async function fetchMovieTrailer(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
}
