import express from "express";
import Movie from "../models/Movie.js";
import fetch from "node-fetch";

const router = express.Router();

// Get all movies

router.get("/top-rated", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    const data = await response.json();

    // Map the results to include the full image URL
    data.results = data.results.map((movie) => ({
      ...movie,
      poster_path: getImageUrl(movie.poster_path),
      backdrop_path: getImageUrl(movie.backdrop_path),
    }));

    // np. tylko pierwsze 10 filmów
    res.json(data.results.slice(0, 10));
  } catch (err) {
    console.error("Error fetching TMDB movies:", err.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

const getImageUrl = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

// Add a movie
router.post("/", async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.status(201).json(newMovie);
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