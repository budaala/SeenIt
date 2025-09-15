const API_URL = "http://localhost:5001/api/movies";

export const movieService = {
  async getMovies(type: string = "popular", page: number = 1) {
    const response = await fetch(`${API_URL}?type=${type}&page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    console.log(`Fetching movies of type: ${type}, page: ${page}`);
    return response.json();
  },

  async searchMovies(query: string, page: number = 1) {
    const response = await fetch(
      `${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to search movies");
    }
    console.log(`Searching movies with query: ${query}, page: ${page}`);
    return response.json();
  },

  async getMovieDetails(movieId: number) {
    const response = await fetch(`${API_URL}/${movieId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    console.log(`Fetching details for movie ID: ${movieId}`);
    return response.json();
  },

  async getPersonDetails(personId: number) {
    const response = await fetch(`${API_URL}/persons/${personId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch person details");
    }
    console.log(`Fetching details for person ID: ${personId}`);
    return response.json();
  },

  // async changeStatus(movieId: number, status: "watched" | "unwatched") {
  // const response = await fetch(`${API_URL}/movies/${movieId}/status`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ status }),
  // });
  // if (!response.ok) {
  //   throw new Error("Failed to change movie status");
  // }
  //   console.log(`Changing status for movie ID ${movieId} to ${status}`);
  // return response.json();
  // },
};
