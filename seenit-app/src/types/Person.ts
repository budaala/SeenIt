export type Person = {
  id: number;
  name: string;
  alias: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  imbd_id: string;
  profile_path: string | null;
  known_for_department: string;
  movie_credits: { id: number; title: string; character: string; poster_path: string | null }[];
};