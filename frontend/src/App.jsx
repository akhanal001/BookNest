import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookSearchPage from "./components/BookSearchPage";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookSearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
