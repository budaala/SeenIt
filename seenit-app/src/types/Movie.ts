export type Movie = {
  id: number;
  title: string;
  year: string;
  overview: string;
  video: string;
  rating: number;
  poster_path: string;
  backdrop_path: string;
  watchProviders: {
    buy: [{ provider_name: string; logo_path: string; url: string }] | [];
    flatrate: [{ provider_name: string; logo_path: string; url: string }] | [];
    rent: [{ provider_name: string; logo_path: string; url: string }];
  } | null;
  cast: { id: number; name: string; character: string; profile_path: string }[];
  crew: { id: number; name: string; job: string; profile_path: string }[];
  genres: { id: number; name: string }[];
  personalRating: number | null;
  status: "watched" | "toWatch";
  streaming: string[];
  inCollection: boolean;
};
