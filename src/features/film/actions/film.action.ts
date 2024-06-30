'use server';

import { FILM_TYPE } from '@/features/film/types/film.type';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { kv } from '@vercel/kv';
import { MovieCredit } from '@/features/film/types/credits.type';
import { cookies } from 'next/headers';
import { KeywordCollection } from '@/features/film/types/keyword.type';

export const fetchFilmCredits = async (type: FILM_TYPE, movieOrTVId: number): Promise<MovieCredit> => {
  const _ = cookies();
  const url = new URL(`${TMDB_HOST}/3/${type}/${movieOrTVId}/credits`);
  const KV_KEY = `film:credits:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as MovieCredit;
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

export const fetchKeywords = async (type: FILM_TYPE, movieOrTVId: number): Promise<KeywordCollection> => {
  const _ = cookies();
  const url = new URL(`${TMDB_HOST}/3/${type}/${movieOrTVId}/keywords`);
  const KV_KEY = `film:keywords:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as KeywordCollection;
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