import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { movieService } from "../services/movieService";
import {
  StarBorder as StarBorderIcon,
  // Add as AddIcon,
  // Visibility as VisibilityIcon,
  ArrowLeft as ArrowLeftIcon,
  FastRewind as FastRewindIcon,
  ArrowRight as ArrowRightIcon,
  FastForward as FastForwardIcon,
  // VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import type { Movie } from "../types/Movie";
import PosterPlaceholder from "./PosterPlaceholder";
import MovieSearchBar from "./SearchBar";

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
  const query = searchParams.get("query") || "";
  const [queryInput, setQueryInput] = useState(searchParams.get("query") || "");

  // let newStatus: "watched" | "unwatched" = "unwatched";
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        let data;
        if (query.trim() !== "") {
          // wyszukiwanie
          data = await movieService.searchMovies(query, pageParam);
        } else {
          // lista filmów typu "type"
          data = await movieService.getMovies(type, pageParam);
        }

        setMovies(data.results);
        setTotalResults(data.total_results);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, query, pageParam]);

  const goToPage = (page: number) => {
    const query = searchParams.get("query") || "";
    setSearchParams({ query, page: page.toString() });
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ query: queryInput, page: "1" });
  };

  const clearSearch = () => {
    setQueryInput("");
    setSearchParams({ query: "", page: "1" });
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
    <div className="container my-5 mx-auto px-2 xs:px-4 lg:px-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h1>
          {type === "popular"
            ? "Popular Movies"
            : type === "top_rated"
            ? "Top Rated Movies"
            : "Upcoming Movies"}
        </h1>
        <MovieSearchBar
          queryInput={queryInput}
          setQueryInput={setQueryInput}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          placeholder="Search for movies..."
        />
      </div>
      <div>
        {query ? (
          <p className="mb-2 text-gray-600">
            Showing results for "<span className="font-semibold">{query}</span>"
          </p>
        ) : (
          <p className="mb-2 text-gray-600">
            Showing {type.replace("_", " ")} movies
          </p>
        )}
        {totalResults > 0 && (
          <>
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
                      <StarBorderIcon className="iconButton" fontSize="small" />
                    </span>
                    {/* add to list */}
                    {/* <span className="action top-1 right-1">
                <AddIcon className="iconButton" fontSize="small" />
              </span> */}
                    {/* seen */}
                    {/* <span className="action top-9 right-1" onClick={() => changeStatus(movie.id)}>
                {movie.status === "watched" ? (
                  <VisibilityIcon className="iconButton" fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon className="iconButton" fontSize="small" />
                )}
              </span> */}
                  </div>
                  {movie.poster_path ? (
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <PosterPlaceholder />
                  )}
                  <div className="p-2 flex flex-col justify-between flex-grow">
                    <h2 className="movieTitle">{movie.title}</h2>
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
          </>
        )}
        {totalResults === 0 && (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
