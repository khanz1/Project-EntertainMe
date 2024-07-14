'use server';

import { APP } from '@/constant';
import {
  ContentRating,
  CoverCollection,
  FetchMangaOptions,
  MangaCollection,
  MangaResponse,
  MangaStatisticsResponse,
} from '@/features/manga/manga.type';
import { ChapterCollection, ChapterResponse, FetchChapterOptions } from '@/features/manga/types/chapter.type';
import { TagCollection } from '@/features/manga/types/tag.type';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { MangaAggregate } from '@/features/manga/types/aggregate.type';

/**
 * Fetches a list of @manga from the MangaDex API based on the provided options.
 *
 * This function sends a GET request to the MangaDex API to retrieve a list of @manga.
 * It applies various search parameters to filter and order the results.
 *
 * @param {FetchMangaOptions} options - The options to configure the fetch request.
 * @param {number} options.pageSize - The number of @manga to fetch per page.
 * @param {number} options.page - The page number to fetch.
 * @param {string} options.searchTerm - The search term to filter the @manga titles.
 * @returns {Promise<MangaCollection>} A promise that resolves to the MangaCollection response from the MangaDex API.
 */
export const fetchManga = async (options: FetchMangaOptions): Promise<MangaCollection> => {
  const limit: string = (options.pageSize || 10).toString();
  const offset: string = (options.pageSize * (options.page - 1)).toString();
  const search = options.searchTerm || '';

  const url = new URL(APP.MANGADEX_API_URL);
  url.pathname = '/manga';

  url.searchParams.append('limit', limit);
  url.searchParams.append('offset', offset);
  url.searchParams.append('title', search);
  url.searchParams.append('includedTagsMode', 'AND');
  url.searchParams.append('order[rating]', 'desc');

  // to prevent from injected pornography content
  // we have to remove it and then add the safe content rating
  url.searchParams.delete('contentRating[]');

  url.searchParams.append('contentRating[]', ContentRating.SAFE);
  url.searchParams.append('contentRating[]', ContentRating.SUGGESTIVE);
  url.searchParams.append('contentRating[]', ContentRating.EROTICA);

  if (options.selectedTags) {
    for (const tag of options.selectedTags) {
      url.searchParams.append('includedTags[]', tag);
    }
  }

  const res = await fetch(url.toString());

  return await res.json();
};

/**
 * Fetches the cover image information for a @manga from the MangaDex API.
 *
 * This function sends a GET request to the MangaDex API to retrieve the cover image information
 * for a specific @manga based on the provided cover ID.
 *
 * @param {string} coverId - The ID of the @manga cover to fetch.
 * @returns {Promise<CoverCollection>} A promise that resolves to the JSON response containing cover image information.
 */
export const fetchMangaCover = async (coverId: string): Promise<CoverCollection> => {
  cookies();
  const KV_KEY = `manga:cover:${coverId}`;
  const cached = await kv.get(KV_KEY);
  if (cached) {
    return cached as CoverCollection;
  }
  const url = new URL(APP.MANGADEX_API_URL);
  url.pathname = `/cover/${coverId}`;

  const res = await fetch(url.toString());

  const data = await res.json();
  await kv.set(KV_KEY, data);

  return data;
};

/**
 * Fetches @manga details from the MangaDex API based on the provided @manga ID.
 *
 * This function sends a GET request to the MangaDex API to retrieve detailed information
 * for a specific @manga identified by its ID.
 *
 * @param {string} mangaId - The ID of the @manga to fetch details for.
 * @returns {Promise<MangaResponse>} A promise that resolves to the MangaCollection response from the MangaDex API.
 */
export const fetchMangaByMangaId = async (mangaId: string): Promise<MangaResponse> => {
  cookies();
  const KV_KEY = `manga:${mangaId}`;
  const cached = await kv.get(KV_KEY);
  if (cached) {
    return cached as MangaResponse;
  }
  const HOST = APP.MANGADEX_API_URL;
  const url = new URL(`${HOST}/manga/${mangaId}`);

  const res = await fetch(url.toString());

  const data = await res.json();
  await kv.set(KV_KEY, data);

  return data;
};

/**
 * Fetches @manga statistics from the MangaDex API based on the provided @manga ID.
 *
 * This function sends a GET request to the MangaDex API to retrieve statistics
 * for a specific @manga identified by its ID.
 *
 * @param {string} mangaId - The ID of the @manga to fetch statistics for.
 * @returns {Promise<MangaStatisticsResponse>} A promise that resolves to the MangaStatisticsResponse from the MangaDex API.
 */
export const fetchStatisticsByMangaId = async (mangaId: string): Promise<MangaStatisticsResponse> => {
  cookies();
  const KV_KEY = `manga:statistics:${mangaId}`;
  const cached = await kv.get(KV_KEY);
  if (cached) {
    return cached as MangaStatisticsResponse;
  }
  const HOST = APP.MANGADEX_API_URL;
  const url = new URL(`${HOST}/statistics/manga/${mangaId}`);

  const res = await fetch(url.toString());

  const data = await res.json();
  await kv.set(KV_KEY, data);

  return data;
};

/**
 * Fetches a list of @manga chapters from the MangaDex API based on the provided options.
 *
 * This function sends a GET request to the MangaDex API to retrieve a list of chapters
 * for a specific @manga identified by its ID. It applies various search parameters to
 * filter and order the results.
 *
 * @param {FetchChapterOptions} params - The options to configure the fetch request.
 * @param {number} params.pageSize - The number of chapters to fetch per page.
 * @param {number} params.page - The page number to fetch.
 * @param {string} params.mangaId - The ID of the @manga to fetch chapters for.
 * @returns {Promise<ChapterCollection>} A promise that resolves to the ChapterCollection response from the MangaDex API.
 */
export const fetchMangaChapterList = async (params: FetchChapterOptions): Promise<ChapterCollection> => {
  cookies();
  const KV_KEY = `manga:chapter:${params.mangaId}:${params.volume}`;

  const cached = await kv.get(KV_KEY);
  if (cached) {
    return cached as ChapterCollection;
  }

  const url = new URL(APP.MANGADEX_API_URL + '/chapter');
  url.searchParams.set('limit', '100');
  url.searchParams.set('offset', '0');
  url.searchParams.set('manga', params.mangaId);
  url.searchParams.append('translatedLanguage[]', 'en');
  url.searchParams.set('volume[]', params.volume.toString());
  url.searchParams.append('contentRating[]', 'safe');
  url.searchParams.append('contentRating[]', 'suggestive');
  url.searchParams.append('contentRating[]', 'erotica');
  url.searchParams.set('order[volume]', 'asc');
  url.searchParams.set('order[chapter]', 'asc');

  const res = await fetch(url.toString());

  const data = await res.json();
  await kv.set(KV_KEY, data);

  return data;
};

/**
 * Fetches detailed information about a @manga chapter from the MangaDex API based on the provided chapter ID.
 *
 * This function sends a GET request to the MangaDex API to retrieve detailed information
 * for a specific chapter identified by its ID.
 *
 * @param {string} chapterId - The ID of the chapter to fetch details for.
 * @returns {Promise<ChapterResponse>} A promise that resolves to the ChapterResponse from the MangaDex API.
 */
export const fetchChapterById = async (chapterId: string): Promise<ChapterResponse> => {
  cookies();
  const KV_KEY = `manga:chapter:content:${chapterId}`;
  const cached = await kv.get(KV_KEY);
  if (cached) {
    return cached as ChapterResponse;
  }
  const url = new URL(`${APP.MANGADEX_API_URL}/at-home/server/${chapterId}`);
  url.searchParams.set('forcePort443', 'true');

  const res = await fetch(url.toString());

  const data = await res.json();
  await kv.set(KV_KEY, data);

  return data;
};

export const fetchMangaTags = async (): Promise<TagCollection> => {
  cookies();
  const KV_KEY = 'manga:tags';
  const cached = await kv.get(KV_KEY);
  if (cached) {
    return cached as TagCollection;
  }
  const url = new URL(APP.MANGADEX_API_URL);
  url.pathname = '/manga/tag';

  const res = await fetch(url.toString());

  const data = await res.json();
  await kv.set(KV_KEY, data);

  return data;
};

export const fetchAggregateByMangaId = async (mangaId: string): Promise<MangaAggregate> => {
  cookies();
  const KV_KEY = `manga:aggregate:${mangaId}`;
  const cached = await kv.get(KV_KEY);
  if (cached) {
    return cached as MangaAggregate;
  }

  const url = new URL(APP.MANGADEX_API_URL);
  url.pathname = `/manga/${mangaId}/aggregate`;
  url.searchParams.set('translatedLanguage[]', 'en');

  const res = await fetch(url.toString());
  const data = await res.json();
  await kv.set(KV_KEY, data);

  return data;
};
