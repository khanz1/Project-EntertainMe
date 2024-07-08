'use server';

import {
  FetchProps,
  FILM_FILTERS,
  ResData,
  type ResFailed,
  StreamAvailabilityProps,
} from '@/features/film/types/film.type';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { Movie, MovieDetail } from '@/features/film/types/movie.type';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { ItemType } from '@prisma/client';

export const fetchMovies = async (props?: Partial<FetchProps>) => {
  // There is a bug when fetch next page in same page are not triggering the kv cache
  // after read https://github.com/vercel/next.js/discussions/50045#discussioncomment-7218266
  // I found that the cookies() function is resetting the cache
  cookies();

  const search = props?.search || null;
  const page = props?.page || 1;
  const filter = props?.filter || FILM_FILTERS.POPULAR;
  let KV_KEY = `movie:${filter}:${page}`;

  const url = new URL(TMDB_HOST);
  url.pathname = `/3/movie/${filter}`;
  url.searchParams.append('page', String(page));

  if (search) {
    KV_KEY = `movie:${search}:${page}`;

    url.pathname = `/3/search/movie`;
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
  cookies();

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

export const checkStreamAvailability = async (props: StreamAvailabilityProps): Promise<boolean> => {
  cookies();

  const url = new URL('https://vidsrc.to');
  let KV_KEY;
  if (props.type === ItemType.movie) {
    url.pathname = `/embed/movie/${props.movieId}`;
    KV_KEY = `stream:movie:${props.movieId}`;
  } else {
    url.pathname = `/embed/tv/${props.tvId}/${props.season}/${props.episode}`;
    KV_KEY = `stream:tv:${props.tvId}:${props.season}:${props.episode}`;
  }

  const cache = await kv.get<boolean>(KV_KEY);

  if (cache) {
    return cache;
  }

  const response = await fetch(url, {
    method: 'HEAD',
  });
  await kv.set(KV_KEY, response.ok);
  return response.ok;
};

