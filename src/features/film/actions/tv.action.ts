'use server';

import { FetchProps, FILM_FILTERS, ResData, type ResFailed } from '@/features/film/types/film.type';
import { cookies } from 'next/headers';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { kv } from '@vercel/kv';
import { TVSeries, TVSeriesDetail } from '../types/series.type';

export const fetchTVSeries = async (props?: Partial<FetchProps>) => {
  // There is a bug when fetch next page in same page are not triggering the kv cache
  // after read https://github.com/vercel/next.js/discussions/50045#discussioncomment-7218266
  // I found that the cookies() function is resetting the cache
  cookies();

  const search = props?.search || null;
  const page = props?.page || 1;
  const filter = props?.filter || FILM_FILTERS.POPULAR;
  let KV_KEY = `tv:${filter}:${page}`;

  let url = new URL(`${TMDB_HOST}/3/tv/${props?.filter}`);
  url.searchParams.append('page', String(page));

  if (props?.search) {
    KV_KEY = `tv:${search}:${page}`;
    url = new URL(`${TMDB_HOST}/3/search/tv`);
    url.searchParams.append('query', props.search);
  }

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as ResData<TVSeries[]>;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const tvSeries: ResData<TVSeries[]> | ResFailed = await response.json();
  if ('success' in tvSeries) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    } as ResData<TVSeries[]>;
  }
  await kv.set(KV_KEY, tvSeries);
  return tvSeries;
};


export const fetchTVSeriesById = async (id: number): Promise<TVSeriesDetail> => {
  cookies();

  const url = new URL(`${TMDB_HOST}/3/tv/${id}`);
  const KV_KEY = `tv:detail:${id}`;

  const cache = await kv.get(KV_KEY);
  if (cache) {
    return cache as TVSeriesDetail;
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
