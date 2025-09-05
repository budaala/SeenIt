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
import PersonPlaceholder from "../components/PersonPlaceholder";

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
    <>
      <div className="goBackSection">
        <a
          role="button"
          className="goBackButton link"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon className="buttonIcon iconButton" />
        </a>
      </div>
      <div className="movie-details-page relative">
        {movie ? (
          <>
            <div
              className="backdrop"
              style={{
                backgroundImage: `url(${movie.backdrop_path})`,
              }}
            >
              <div className="details-overlay pointer-events-none"></div>
            </div>
            <div className="details">
              <div className="overviewInfo">
                <div className="poster-section">
                  <div className="poster-container relative">
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
                        </button>
                      )}
                      {showTrailer && (
                        <div className="movieTrailerModal">
                          <div className="modalContent" ref={modalRef}>
                            <iframe
                              className="video"
                              src={movie.video}
                            ></iframe>
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
                </div>
                <div className="info">
                  <div className="header">
                    <h1 className="title">
                      {movie.title}
                      <div className="year">{movie.year}</div>
                    </h1>
                    <a
                      className="iconButton imdbLogoContainer"
                      href={`https://www.imdb.com/title/${movie.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={imdbLogo}
                        alt="IMDb Logo"
                        className="logoLink imdbLogo"
                      />
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
                      movie.watchProviders ?? {
                        buy: [],
                        flatrate: [],
                        rent: [],
                      }
                    }
                  />
                </div>
              </div>
              <div className="creditsSection z-10">
                <div className="cast">
                  <h2 className="title">Cast</h2>
                  <div className="list castList">
                    {movie.cast && movie.cast.length > 0 ? (
                      movie.cast.slice(0, 6).map((member) => (
                        <div key={member.id} className="member castMember">
                          {member.profile_path ? (
                            <img
                              src={
                                member.profile_path ||
                                "https://via.placeholder.com/150x225?text=No+Image"
                              }
                              alt={member.name}
                              className="photo castPhoto w-20"
                            />
                          ) : (
                            <PersonPlaceholder />
                          )}
                          <p className="name castName">{member.name}</p>
                          <p className="character castCharacter">
                            {member.character}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No cast information available.
                      </p>
                    )}
                  </div>
                </div>
                {/* crew */}
                <div className="crew">
                  <h2 className="title">Crew</h2>
                  <div className="list crewList">
                    {movie.crew && movie.crew.length > 0 ? (
                      movie.crew.slice(0, 6).map((member) => (
                        <div key={member.id} className="member crewMember">
                          {member.profile_path ? (
                            <img
                              src={
                                member.profile_path ||
                                "https://via.placeholder.com/150x225?text=No+Image"
                              }
                              alt={member.name}
                              className="photo crewPhoto w-20"
                            />
                          ) : (
                            <PersonPlaceholder />
                          )}
                          <p className="name crewName">{member.name}</p>
                          <p className="character crewCharacter">
                            {member.job}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No crew information available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Movie not found.</p>
        )}
      </div>
    </>
  );
}
