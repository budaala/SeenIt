import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const getImageUrl = (path, width = "original") => {
  path ? path : "";
  if (!path) return null; // Return null if path is empty or undefined
  return `https://image.tmdb.org/t/p/${width}${path}`;
};

const getVideoUrl = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
    const res = await response.json();
    const youtubeTrailers = res.results.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    if (youtubeTrailers.length > 0) {
      return `https://www.youtube.com/embed/${youtubeTrailers[0].key}`;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error fetching video URL:", err.message);
    return null;
  }
}

const getWatchProviders = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, options);
    const res = await response.json();
    if (res.results && res.results.PL) {
      const providers = res.results.PL;
      const flatrate = providers.flatrate ? providers.flatrate.map(returnProviderData) : [];
      const rent = providers.rent ? providers.rent.map(returnProviderData) : [];
      const buy = providers.buy ? providers.buy.map(returnProviderData) : [];
      const results = {
        flatrate,
        rent,
        buy
      }
      return results;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error fetching watch providers:", err.message);
    return [];
  }
}

const returnProviderData = (provider) => {
  const providerUrls = {
    8: "https://www.netflix.com/pl/",
    337: "https://www.disneyplus.com/pl-pl/",
    384: "https://play.hbomax.com/",
    119: "https://www.primevideo.com/",
    10: "https://www.primevideo.com/",
    9: "https://www.primevideo.com/",
    2: "https://tv.apple.com/pl/",
    283: "https://player.pl/",
    505: "https://player.pl/",
    531: "https://premiery.pl.canalplus.com/",
    35: "https://rakuten.tv/pl"
  };

  const providerUrl = providerUrls[provider.provider_id] || null;
  return {
    provider_id: provider.provider_id,
    provider_name: provider.provider_name,
    logo_path: getImageUrl(provider.logo_path, "w92"),
    url: providerUrl,
  };
}

const token = process.env.TMDB_BEARER_TOKEN;
const region = process.env.TMDB_REGION || "US";
const language = process.env.TMDB_LANGUAGE || "en-US";

const options = { method: 'GET', headers: { accept: 'application/json', Authorization: `Bearer ${token}` } };

// Get all movies

router.get("/", async (req, res) => {
  console.log(req.query);
  const filter = req.query.type || "popular";
  const page = req.query.page || 1;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?language=${language}&page=${page}&region=${region}`, options
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
      `https://api.themoviedb.org/3/search/movie?language=${language}&query=${encodeURIComponent(query)}&page=${page}`, options
    );

    if (!response.ok) {
      console.error("Failed to fetch from TMDB:", response.statusText);
      return res.status(response.status).json({ error: "Failed to search movies" });
    }

    const data = await response.json();
    data.results = data.results.map((movie) => ({
      ...movie,
      poster_path: getImageUrl(movie.poster_path),
      rating: (Math.round(movie.vote_average * 100) / 100).toFixed(1),
    }));

    res.json({ results: data.results, total_results: data.total_results > 10000 ? 10000 : data.total_results });
  } catch (err) {
    console.error("Error searching TMDB movies:", err.message);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// get movie by id
router.get("/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=${language}`, options
    );
    if (!response.ok) {
      console.error("Failed to fetch from TMDB:", response.statusText);
      return res.status(response.status).json({ error: "Failed to fetch movie" });
    }
    const data = await response.json();
    const videoUrl = await getVideoUrl(data.id);
    const movie = {
      genres: data.genres || [],
      id: data.id,
      title: data.title,
      overview: data.overview,
      origin_country: data.origin_country || [],
      original_language: data.original_language,
      original_title: data.original_title,
      popularity: data.popularity,
      status: data.status || "N/A",
      video: videoUrl,
      vote_count: data.vote_count,
      year: data.release_date ? data.release_date.split("-")[0] : "N/A",
      poster_path: getImageUrl(data.poster_path),
      backdrop_path: getImageUrl(data.backdrop_path),
      rating: (Math.round(data.vote_average * 100) / 100).toFixed(1),
      watchProviders: await getWatchProviders(data.id),
    }
    console.log(movie.watchProviders)
    res.json(movie);
  } catch (err) {
    console.error("Error fetching TMDB movie:", err.message);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// fetch('https://api.themoviedb.org/3/movie/278/translations', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

export default router;