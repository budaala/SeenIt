import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieService } from "../services/movieService";
import type { Movie } from "../types/Movie";
import {
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
  ArrowBackIos as ArrowBackIcon,
} from "@mui/icons-material";
import MovieRating from "../components/MovieRating";
import imdbLogo from "../assets/logos/imdb-logo.png";
import MovieWatchProviders from "../components/MovieWatchProviders";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (id) {
      const fetchData = async () => {
        try {
          let data;
          data = await movieService.getMovieDetails(parseInt(id));
          console.log(data);
          setMovie(data);
        } catch (err) {
          console.error("Error fetching movie details:", err);
          setMovie(undefined);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (!showTrailer) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowTrailer(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showTrailer]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="movie-details-page">
      {movie ? (
        <div
          className="backdrop"
          style={{
            backgroundImage: `url(${movie.backdrop_path})`,
          }}
        >
          <div className="details-overlay">
            <div className="goBackSection">
              <button
                type="button"
                className="goBackButton"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon className="buttonIcon" /> Go Back
              </button>
            </div>
            <div className="details">
              <div className="poster-section">
                <div className="rating-badge">
                  <MovieRating rating={movie.rating} />
                </div>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="poster"
                />
                <div className="movieTrailerSection">
                  {movie.video && (
                    <button
                      type="button"
                      className="showTrailerButton"
                      onClick={() => setShowTrailer(true)}
                    >
                      <PlayArrowIcon className="buttonIcon" />
                      {/* <span className="buttonText">Trailer</span> */}
                    </button>
                  )}
                  {showTrailer && (
                    <div className="movieTrailerModal">
                      <div className="modalContent" ref={modalRef}>
                        <iframe className="video" src={movie.video}></iframe>
                        <span
                          className="closeIconContainer"
                          onClick={() => setShowTrailer(false)}
                        >
                          <CloseIcon className="closeIcon" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="info">
                <div className="header">
                  <h1 className="title">
                    {movie.title}
                    <span className="year">{movie.year}</span>
                  </h1>
                  <a
                    className="iconButton"
                    href={`https://www.imdb.com/title/${movie.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={imdbLogo} alt="IMDb Logo" className="logoLink" />
                  </a>
                </div>
                <div className="subInfo">
                  {movie.genres && movie.genres.length > 0 && (
                    <p className="genres">
                      {movie.genres.map((genre) => (
                        <button key={genre.id} className="genre">
                          {genre.name}
                        </button>
                      ))}
                    </p>
                  )}
                </div>
                <p className="overview">{movie.overview}</p>
                <MovieWatchProviders
                  movieWatchProviders={
                    movie.watchProviders ?? { buy: [], flatrate: [], rent: [] }
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Movie not found.</p>
      )}
    </div>
  );
}
