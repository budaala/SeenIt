import React, { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/movies/top-rated");
        const data = await res.json();
        console.log("Fetched movie:", data[0]);
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
    <div className="container mx-auto px-2 xs:px-4 lg:px-8 max-w-5xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-bgColor rounded-xl shadow-md overflow-hidden w-full h-full flex flex-col"
          >
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
