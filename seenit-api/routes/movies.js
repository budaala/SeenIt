import express from "express";
import Movie from "../models/Movie.js";
import fetch from "node-fetch";

const router = express.Router();

const getImageUrl = (path) => {
  path ? path : "";
  if (!path) return null; // Return null if path is empty or undefined
  return `https://image.tmdb.org/t/p/w500${path}`;
};

// Get all movies

router.get("/", async (req, res) => {
  console.log(req.query);
  const filter = req.query.type || "popular";
  const page = req.query.page || 1;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}&region=${process.env.TMDB_REGION}`
    );

    if (!response.ok) {
      console.error("Failed to fetch from TMDB:", response.statusText);
      return res.status(response.status).json({ error: "Failed to fetch movies" });
    }

    const data = await response.json();

    // Map the results to include the full image URL
    data.results = data.results.map((movie) => ({
      ...movie,
      poster_path: getImageUrl(movie.poster_path),
      backdrop_path: getImageUrl(movie.backdrop_path),
      rating: (Math.round(movie.vote_average * 100) / 100).toFixed(1),
    }));

    res.json({ results: data.results, total_results: data.total_results > 10000 ? 10000 : data.total_results });
  } catch (err) {
    console.error("Error fetching TMDB movies:", err.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// search movies
router.get("/search", async (req, res) => {
  const query = req.query.query;
  const page = req.query.page || 1;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
    );

    if (!response.ok) {
      console.error("Failed to fetch from TMDB:", response.statusText);
      return res.status(response.status).json({ error: "Failed to search movies" });
    }

    const data = await response.json();
    data.results = data.results.map((movie) => ({
      ...movie,
      poster_path: getImageUrl(movie.poster_path),
      backdrop_path: getImageUrl(movie.backdrop_path),
      rating: (Math.round(movie.vote_average * 100) / 100).toFixed(1),
    }));

    res.json({ results: data.results, total_results: data.total_results > 10000 ? 10000 : data.total_results });
  } catch (err) {
    console.error("Error searching TMDB movies:", err.message);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTg0NGEyNGU0MDZmYzk0YmU3YjEwODk0NjQ3MmMyZSIsIm5iZiI6MTc1Mzg3Mzg2Ny4zNjUsInN1YiI6IjY4ODlmZGNiNTQ3NjEzYjdkZmIyNmFkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vq-DJcfn1d0UYLLHJjq0Dh8-HOyalkB-txKmIa8a6Zk'
//   }
// };

// fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// fetch('https://api.themoviedb.org/3/movie/278/translations', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// fetch('https://api.themoviedb.org/3/movie/278/watch/providers', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

export default router;