# 🎬 PSIflix — Movie Review Hub

**PSIflix** is a modern movie review web app built with React and powered by The Movie Database (TMDB) API.  
It allows users to explore popular movies, view trailers, read details, and manage their personal watchlist — all in a sleek Netflix-style UI.

---

## 🚀 Features

- 🔍 **Search movies** by title
- 📊 **Popular movies** loaded from TMDB API
- 🎞️ **Watch trailers** embedded from YouTube
- 🎟️ **Detailed movie pages** with genres, release date, overview
- ❤️ **Add to favorites** (saved in localStorage)
- 🧠 **Smart optimizations**: lazy loading, memoization, prefetching
- 🧰 **External API integration** (OMDb for ratings, runtime, actors)
- 📱 **Responsive UI** with framer-motion animations
- 💡 **Performance-focused architecture** and fast load times

---

## 🖼️ Screenshots

<img src="https://via.placeholder.com/800x450?text=Home+Page" alt="Homepage Screenshot">
<img src="https://via.placeholder.com/800x450?text=Movie+Details" alt="Movie Details Screenshot">

---

## ⚙️ Tech Stack

- **React 18+**
- **Framer Motion**
- **React Router**
- **TMDB API** – movie data
- **OMDb API** – IMDb ratings and metadata
- **LocalStorage** – persistent favorites
- **Lighthouse-optimized** for performance

---

## 📦 Installation

```bash
git clone https://github.com/your-username/psiflix.git
cd psiflix
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add your API keys:

```env
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_OMDB_KEY=your_omdb_api_key
```

> Don't forget to get your API keys from:
> - [TMDB](https://www.themoviedb.org/)
> - [OMDb](https://www.omdbapi.com/)

---

## 🧠 Optimizations

- `React.lazy()` + `Suspense` for **code splitting**
- `useMemo`, `useCallback`, and `React.memo` for **render optimization**
- **Page prefetching** on hover with custom `preloadMovieDetails()`
- Movie detail **caching** via localStorage

---

## 📌 Project Structure

```
src/
├── components/
├── pages/
├── services/
├── utils/
├── style.css
├── App.js
```

---

## 👨‍💻 Author

Made with ❤️ by **Psinusoida**

> Follow me on GitHub for more creative projects.

---

## 📄 License

MIT — Free to use for personal and commercial purposes.
