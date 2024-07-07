'use server';

import { FilmType, ResData } from '@/features/film/types/film.type';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { kv } from '@vercel/kv';
import { MovieCredit } from '@/features/film/types/credits.type';
import { cookies } from 'next/headers';
import { KeywordCollection } from '@/features/film/types/keyword.type';
import { MovieRecommendation } from '@/features/film/types/recommendation.type';

export const fetchFilmCredits = async (type: FilmType, movieOrTVId: number): Promise<MovieCredit> => {
  cookies();
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
export const fetchKeywords = async (type: FilmType, movieOrTVId: number): Promise<KeywordCollection> => {
  cookies();
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

export const fetchRecommendations = async (type: FilmType, movieOrTVId: number): Promise<ResData<MovieRecommendation[]>> => {
  cookies();
  const url = new URL(`${TMDB_HOST}/3/${type}/${movieOrTVId}/recommendations`);
  const KV_KEY = `film:recommendations:${type}:${movieOrTVId}`;

  const cache = await kv.get<ResData<MovieRecommendation[]>>(KV_KEY);

  if (cache) {
    return cache;
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