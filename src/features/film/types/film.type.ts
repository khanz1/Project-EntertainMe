import { Movie } from './movie.type';
import { TVSeries } from './series.type';
import { ItemType } from '@prisma/client';

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


export type MovieVidSrcProps = {
  type: typeof ItemType.movie;
  movieId: number;
};

export type TVVidSrcProps = {
  type: typeof ItemType.tv;
  tvSeriesId: number;
  season: number;
  episode: number;
};

export type FilmType = typeof ItemType.movie | typeof ItemType.tv;

export enum FILM_FILTERS {
  NONE = '',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
  NOW_PLAYING = 'now_playing',
  ON_THE_AIR = 'on_the_air',
  AIRING_TODAY = 'airing_today',
}

export type WithType<T> = T & { type?: FilmType };
export type Film = WithType<Movie> | WithType<TVSeries>;
export type FetchProps = {
  page: number;
  filter: FILM_FILTERS;
  search: string;
};

type MovieStreamProps = {
  type: typeof ItemType.movie
  movieId: number;
}

type TVStreamProps = {
  type: typeof ItemType.tv
  tvId: number;
  season: number;
  episode: number;
}

export type StreamAvailabilityProps = MovieStreamProps | TVStreamProps;