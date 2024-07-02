'use server';

import { cookies } from 'next/headers';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { kv } from '@vercel/kv';
import { Collection } from '@/features/film/types/collection.type';

// https://api.themoviedb.org/3/collection/{collection_id}
export const fetchCollectionById = async (id: number) => {
  cookies();

  const url = new URL(`${TMDB_HOST}/3/collection/${id}`);
  const KV_KEY = `collection:${id}`;

  const cache = await kv.get(KV_KEY);
  if (cache) {
    return cache as Collection;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const data: Collection = await response.json();
  await kv.set(KV_KEY, data);
  return data;
};