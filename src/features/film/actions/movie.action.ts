'use server';

import { FetchProps, FILM_FILTERS, ResData, type ResFailed, WithType } from '@/features/film/types/film.type';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { Movie } from '@/features/film/types/movie.type';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';


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
    return cache as ResData<WithType<Movie>[]>;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const movies: ResData<WithType<Movie>[]> | ResFailed = await response.json();
  if ('success' in movies) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
  await kv.set(KV_KEY, movies);
  return movies;
};