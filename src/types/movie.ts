type Genre = {
  id: number;
  name: string;
};

export type MovieDetails = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
  genres: Genre[];
  overview: string;
  videos: {
    results: MovieVideo[];
  };
  runtime: number | null;
  tagline: string;
  original_title: string | null;
  original_language: string;
  credits: {
    cast: MovieCast[];
    crew: MovieCrew[];
  };
};

type MovieCast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

type MovieCrew = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
};

type MovieVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

export type MovieListItem = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
};

export type MovieListResponse = {
  page: number;
  results: MovieListItem[];
  total_pages: number;
  total_results: number;
};
