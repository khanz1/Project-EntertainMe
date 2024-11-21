import { Film, MovieVidSrcProps, TVVidSrcProps, WithType } from './types/film.type';
import { Movie } from './types/movie.type';
import { TVSeries } from './types/series.type';
import { ItemType } from '@prisma/client';
import { ImageSize } from '@/constant';

export const getTmdbImage = (
  filePath: string,
  size: ImageSize = ImageSize.MEDIUM,
) => {
  if (size === ImageSize.LARGE) {
    return `https://image.tmdb.org/t/p/w500${filePath}`;
  } else if (size === ImageSize.MEDIUM) {
    return `https://image.tmdb.org/t/p/w342${filePath}`;
  } else if (size === ImageSize.SMALL) {
    return `https://image.tmdb.org/t/p/w185${filePath}`;
  } else {
    return `https://image.tmdb.org/t/p/original${filePath}`;
  }
};

// Type guard functions
export const isMovie = (film: Film): film is WithType<Movie> => {
  return film.type === ItemType.movie;
};

export const isTVSeries = (film: Film): film is WithType<TVSeries> => {
  return film.type === ItemType.tv;
};

export const fMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursString = hours > 0 ? `${hours}h` : '';
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes}m` : '';
  const separator = hours > 0 && remainingMinutes > 0 ? ' ' : '';
  return hoursString + separator + minutesString;
};

export const getVidSrcStreamUrl = (props: MovieVidSrcProps | TVVidSrcProps) => {
  return ''
  // if (props.type === ItemType.movie) {
  //  return `https://vidsrc.to/embed/movie/${props.movieId}`;
  // }
  // return `https://vidsrc.to/embed/tv/${props.tvSeriesId}/${props.season}/${props.episode}`;
};
