'use server';

import { FilmType, ResData, Review } from '@/features/film/types/film.type';
import { kv } from '@vercel/kv';
import { MovieCredit } from '@/features/film/types/credits.type';
import { cookies } from 'next/headers';
import { KeywordCollection } from '@/features/film/types/keyword.type';
import { MovieRecommendation } from '@/features/film/types/recommendation.type';
import { VideoResponse } from '@/features/film/types/video.type';
import { ImageCollection } from '@/features/film/types/image.type';
import { APP } from '@/constant';

export const fetchFilmCredits = async (type: FilmType, movieOrTVId: number): Promise<MovieCredit> => {
  cookies();
  const url = new URL(`${APP.TMDB_HOST}/3/${type}/${movieOrTVId}/credits`);
  const KV_KEY = `film:credits:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as MovieCredit;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};

export const fetchKeywords = async (type: FilmType, movieOrTVId: number): Promise<KeywordCollection> => {
  cookies();
  const url = new URL(`${APP.TMDB_HOST}/3/${type}/${movieOrTVId}/keywords`);
  const KV_KEY = `film:keywords:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as KeywordCollection;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};

export const fetchRecommendations = async (type: FilmType, movieOrTVId: number): Promise<ResData<MovieRecommendation[]>> => {
  cookies();
  const url = new URL(`${APP.TMDB_HOST}/3/${type}/${movieOrTVId}/recommendations`);
  const KV_KEY = `film:recommendations:${type}:${movieOrTVId}`;

  const cache = await kv.get<ResData<MovieRecommendation[]>>(KV_KEY);

  if (cache) {
    return cache;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};

export const fetchReviews = async (
  filmType: FilmType,
  movieOrTVId: number,
): Promise<ResData<Review[]>> => {
  cookies();

  const url = new URL(`${APP.TMDB_HOST}/3/${filmType}/${movieOrTVId}/reviews`);
  const KV_KEY = `movie:reviews:${filmType}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as ResData<Review[]>;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};

export const fetchFilmVideos = async (type: FilmType, movieOrTVId: number): Promise<VideoResponse> => {
  cookies();
  const url = new URL(`${APP.TMDB_HOST}/3/${type}/${movieOrTVId}/videos`);
  const KV_KEY = `film:videos:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as VideoResponse;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};


export const fetchFilmImages = async (type: FilmType, movieOrTVId: number): Promise<ImageCollection> => {
  cookies();
  const url = new URL(`${APP.TMDB_HOST}/3/${type}/${movieOrTVId}/images`);
  const KV_KEY = `film:images:${type}:${movieOrTVId}`;

  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as ImageCollection;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};