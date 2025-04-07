import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./style.css";

// Ленивые импорты
const Header = React.lazy(() => import("./components/Header"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = React.lazy(() => import("./pages/MovieDetailsPage"));
const FavoritesPage = React.lazy(() => import("./pages/FavoritesPage"));

// Основной роутинг
const AppContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="app-loading content">Загрузка...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="app-loading header">Загрузка меню...</div>}>
        <Header />
      </Suspense>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
