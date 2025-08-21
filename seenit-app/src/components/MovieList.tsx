import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { movieService } from "../services/movieService";
import {
  StarBorder as StarBorderIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  ArrowLeft as ArrowLeftIcon,
  FastRewind as FastRewindIcon,
  ArrowRight as ArrowRightIcon,
  FastForward as FastForwardIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import type { Movie } from "../types/Movie";

type MovieListProps = {
  type?: "popular" | "top_rated" | "upcoming";
};

const MovieList: React.FC<MovieListProps> = ({ type = "popular" }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const totalPages = Math.ceil(totalResults / 20) || 500; // tmbd returns 20 results per page and max 500 pages

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  
  // let newStatus: "watched" | "unwatched" = "unwatched";

  useEffect(() => {
    setLoading(true);
    movieService
      .getMovies(type, pageParam)
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data.results);
        setTotalResults(data.total_results);
      })
      .catch((err) => console.error("Error fetching movies:", err))
      .finally(() => setLoading(false));
  }, [type, pageParam]);

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  // const changeStatus = (movieId: number) => {
  //   setMovies((prevMovies: Movie[]) =>
  //         prevMovies.map((movie) => {
  //       if (movie.id === movieId) {
  //         newStatus = movie.status === "watched" ? "unwatched" : "watched";
  //         return { ...movie, status: newStatus } as Movie;
  //       }
  //       return movie;
  //     })
  //   );
    
  //   console.log(`Changed status for movie ID ${movieId} to ${newStatus}`);
  //   movieService.changeStatus(movieId, newStatus);
  // };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container my-3 mx-auto px-2 xs:px-4 lg:px-8 max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">
        {type === "popular"
          ? "Popular Movies"
          : type === "top_rated"
          ? "Top Rated Movies"
          : "Upcoming Movies"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movieCard relative group rounded-xl shadow-md overflow-hidden w-full h-full flex flex-col"
          >
            <div className="flex sm:hidden group-hover:flex">
              {/* rating */}
              <span className="action top-1 left-1">
                {movie.rating}
                <StarBorderIcon className="icon" fontSize="small" />
              </span>
              {/* add to list */}
              {/* <span className="action top-1 right-1">
                <AddIcon className="icon" fontSize="small" />
              </span> */}
              {/* seen */}
              {/* <span className="action top-9 right-1" onClick={() => changeStatus(movie.id)}>
                {movie.status === "watched" ? (
                  <VisibilityIcon className="icon" fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon className="icon" fontSize="small" />
                )}
              </span> */}
            </div>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => goToPage(1)}
          disabled={pageParam === 1}
          className="paginationButton"
        >
          <FastRewindIcon fontSize="small" />
        </button>
        <button
          onClick={() => goToPage(Math.max(pageParam - 1, 1))}
          disabled={pageParam === 1}
          className="paginationButton"
        >
          <ArrowLeftIcon />
        </button>
        <span className="px-2 py-2 ml-0">
          Page {pageParam} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(Math.min(pageParam + 1, totalPages))}
          disabled={pageParam === totalPages}
          className="paginationButton"
        >
          <ArrowRightIcon />
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={pageParam === totalPages}
          className="paginationButton"
        >
          <FastForwardIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
