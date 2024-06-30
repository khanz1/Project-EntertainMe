'use server';

import {
  FetchProps,
  FILM_FILTERS,
  FILM_TYPE,
  ResData,
  type ResFailed,
  Review,
  StreamAvailabilityProps,
} from '@/features/film/types/film.type';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { Movie, MovieDetail } from '@/features/film/types/movie.type';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { VideoResponse } from '@/features/film/types/video.type';
import { ImageCollection } from '@/features/film/types/image.type';


export const fetchMovies = async (props?: Partial<FetchProps>) => {
  // There is a bug when fetch next page in same page are not triggering the kv cache
  // after read https://github.com/vercel/next.js/discussions/50045#discussioncomment-7218266
  // I found that the cookies() function is resetting the cache
  const _ = cookies();

  const search = props?.search || null;
  const page = props?.page || 1;
  const filter = props?.filter || FILM_FILTERS.POPULAR;
  let KV_KEY = `movie:${filter}:${page}`;

  let url = new URL(`${TMDB_HOST}/3/movie/${filter}`);
  url.searchParams.append('page', String(page));

  if (search) {
    KV_KEY = `movie:${search}:${page}`;

    url = new URL(`${TMDB_HOST}/3/search/movie`);
    url.searchParams.append('query', search);
  }

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as ResData<Movie[]>;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const movies: ResData<Movie[]> | ResFailed = await response.json();
  if ('success' in movies) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    } as ResData<Movie[]>;
  }
  await kv.set(KV_KEY, movies);
  return movies;
};

export const fetchMovieById = async (id: number): Promise<MovieDetail> => {
  const _ = cookies();

  const url = new URL(`${TMDB_HOST}/3/movie/${id}`);
  const KV_KEY = `movie:detail:${id}`;

  const cache = await kv.get(KV_KEY);
  if (cache) {
    return cache as MovieDetail;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};

export const fetchReviews = async (
  movieOrTVId: number,
  filmType: FILM_TYPE,
): Promise<ResData<Review[]>> => {
  const _ = cookies();

  const url = new URL(`${TMDB_HOST}/3/${filmType}/${movieOrTVId}/reviews`);
  const KV_KEY = `movie:reviews:${filmType}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as ResData<Review[]>;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};

export const checkStreamAvailability = async (props: StreamAvailabilityProps): Promise<boolean> => {
  let url: URL;
  if (props.type === FILM_TYPE.MOVIE) {
    url = new URL(`https://vidsrc.to/embed/movie/${props.movieId}`);
  } else {
    url = new URL(`https://vidsrc.to/embed/tv/${props.tvId}/${props.season}/${props.episode}`);
  }

  const response = await fetch(url);
  return response.ok;
};


export const fetchFilmVideos = async (type: FILM_TYPE, movieOrTVId: number): Promise<VideoResponse> => {
  const _ = cookies();
  const url = new URL(`${TMDB_HOST}/3/${type}/${movieOrTVId}/videos`);
  const KV_KEY = `film:videos:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as VideoResponse;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};

export const fetchFilmImages = async (type: FILM_TYPE, movieOrTVId: number): Promise<ImageCollection> => {
  const _ = cookies();
  const url = new URL(`${TMDB_HOST}/3/${type}/${movieOrTVId}/images`);
  const KV_KEY = `film:images:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as ImageCollection;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};