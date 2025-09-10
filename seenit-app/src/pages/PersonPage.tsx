import { useEffect, useState } from "react";
import type { Person } from "../types/Person";
import { movieService } from "../services/movieService";
import GoBack from "../components/GoBackButton";
import { Link } from "react-router-dom";
import PosterPlaceholder from "../components/PosterPlaceholder";

const PersonPage: React.FC = () => {
  const personId = parseInt(
    window.location.pathname.split("/").pop() || "",
    10
  );
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    if (personId) {
      const fetchData = async () => {
        try {
          let data;
          data = await movieService.getPersonDetails(personId);
          console.log(data);
          data.birthday = formatDate(data.birthday);
          if (data.deathday) {
            data.deathday = formatDate(data.deathday);
          }
          setPerson(data);
        } catch (err) {
          console.error("Error fetching person details:", err);
          setPerson(undefined);
        }
      };
      fetchData();
    }
  }, [personId]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!person) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <>
      <GoBack />
      <div className="personPage">
        <div className="personProfile">
          <div className="leftSection">
            <img
              src={person.profile_path || ""}
              alt={person.name}
              className="profilePhoto"
            />
            <div className="personDetails">
              <div className="detailsHeader">
                <h2 className="name">{person.name}</h2>
                <p className="knownForDept">{person.known_for_department}</p>
              </div>
              <div className="dates">
                <p>
                  {person.birthday}
                  {person.deathday && <span> - {person.deathday}</span>}
                </p>
              </div>
              <p className="biography">{person.biography}</p>
            </div>
          </div>
          <div className="knownForMovies">
            <h3 className="knownForTitle">Known For</h3>
            <div className="movieGrid">
              {person.movie_credits.map((movie) => (
                <div key={movie.id} className="movieCard">
                  <Link to={`/movies/${movie.id}`}>
                    {movie.poster_path ? (
                      <img
                        src={movie.poster_path || ""}
                        alt={movie.title}
                        className="moviePoster"
                      />
                    ) : (
                      <PosterPlaceholder />
                    )}
                    <h4 className="movieTitle">{movie.title}</h4>
                    <p className="movieCharacter">{movie.character}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonPage;
