import React from "react";
import { StarBorder as StarBorderIcon } from "@mui/icons-material";

const MovieRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <span className="action top-1 left-1">
      {rating}
      <StarBorderIcon className="iconButton" fontSize="small" />
    </span>
  );
};

export default MovieRating;
