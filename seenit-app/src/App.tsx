import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import TopRatedMovies from "./components/TopRatedMovies";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
