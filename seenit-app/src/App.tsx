import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyMovieList from "./pages/MyMovieList";
import TopRatedPage from "./pages/TopRatedPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import PersonPage from "./pages/PersonPage";
import Footer from "./components/Footer";
import LogIn from "./components/SignIn/LogIn";
import Register from "./components/SignIn/Register";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/my-list" element={<MyMovieList />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/person/:id" element={<PersonPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
