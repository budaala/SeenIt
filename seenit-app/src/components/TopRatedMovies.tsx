import React, { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

const TopRatedMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/movies/top-rated");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies from backend:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-bgColor rounded-xl shadow-md overflow-hidden"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-2">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRatedMovies;
