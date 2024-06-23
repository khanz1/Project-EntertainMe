import { Movie } from './movie.type';
import { TVSeries } from './series.type';

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type ResFailed = {
  success: false;
  status_code: number;
  status_message: string;
};

export type ResData<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
};

export enum FILM_TYPE {
  MOVIE = 'movie',
  TV_SERIES = 'tv',
}

export enum FILM_FILTERS {
  NONE = '',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
  NOW_PLAYING = 'now_playing',
  ON_THE_AIR = 'on_the_air',
  AIRING_TODAY = 'airing_today',
}

export type WithType<T> = T & { type?: FILM_TYPE };
export type Film = WithType<Movie> | WithType<TVSeries>;
export type FetchProps = {
  page: number;
  filter: FILM_FILTERS;
  search: string;
};

// Define a type alias for the parameters of the getFilmList function
type SortOrder = 'asc' | 'desc';
export type FindFilmListParams = {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: FILM_FILTERS; // Add more fields as needed
  sortOrder?: SortOrder;
  genre?: string;
};

export enum ENTERTAIN_TYPE {
  MOVIE = 'movie',
  TV = 'tv',
}