import { Film, FILM_TYPE, WithType } from './types/film.type';
import { Movie } from './types/movie.type';
import { TVSeries } from './types/series.type';

export const getTmdbImage = (filePath: string) => {
  return `https://image.tmdb.org/t/p/w500${filePath}`;
};

// Type guard functions
export const isMovie = (film: Film): film is WithType<Movie> => {
  return film.type === FILM_TYPE.MOVIE;
};

export const isTVSeries = (film: Film): film is WithType<TVSeries> => {
  return film.type === FILM_TYPE.TV_SERIES;
};