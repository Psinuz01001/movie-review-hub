// === App.js ===
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import { ThemeProvider } from "./context/ThemeContext";

const AppContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
