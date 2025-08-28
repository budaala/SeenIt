import React from "react";
import { useNavigate } from "react-router-dom";
import { StarBorder as StarBorderIcon } from "@mui/icons-material";
import type { Movie } from "../types/Movie";
import PosterPlaceholder from "./PosterPlaceholder";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="movieCard relative group rounded-xl shadow-md overflow-hidden w-full h-full flex flex-col cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="flex sm:hidden group-hover:flex">
        {/* rating */}
        <span className="action top-1 left-1">
          {movie.rating}
          <StarBorderIcon className="iconButton" fontSize="small" />
        </span>
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
  );
};

export default MovieCard;
