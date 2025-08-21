export type Movie = {
  id: number;
  title: string;
  year: number;
  cover: string;
  description: string;
  trailer: string;
  rating: number;
  poster_path: string;
  personalRating: number | null;
  status: "watched" | "toWatch";
  streaming: string[];
  inCollection: boolean;
};
