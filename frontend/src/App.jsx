import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookSearchPage from "./components/BookSearchPage";
import FavoritesPage from "./components/FavoritesPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import BookDetailPage from "./components/BookDetailPage";


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BookSearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
