import { Film, FILM_TYPE, WithType } from './types/film.type';
import { Movie } from './types/movie.type';
import { TVSeries } from './types/series.type';

export enum ImageSize {
  SMALL = 'w185',
  MEDIUM = 'w342',
  LARGE = 'w500',
  ORIGINAL = 'original',
}

export const getTmdbImage = (filePath: string, size: ImageSize = ImageSize.MEDIUM) => {
  if (size === ImageSize.LARGE) {
    return `https://image.tmdb.org/t/p/w500${filePath}`;
  } else if (size === ImageSize.MEDIUM) {
    return `https://image.tmdb.org/t/p/w342${filePath}`;
  } else {
    return `https://image.tmdb.org/t/p/original${filePath}`;
  }
};

// Type guard functions
export const isMovie = (film: Film): film is WithType<Movie> => {
  return film.type === FILM_TYPE.MOVIE;
};

export const isTVSeries = (film: Film): film is WithType<TVSeries> => {
  return film.type === FILM_TYPE.TV_SERIES;
};

export const fMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursString = hours > 0 ? `${hours}h` : '';
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes}m` : '';
  const separator = hours > 0 && remainingMinutes > 0 ? ' ' : '';
  return hoursString + separator + minutesString;
};