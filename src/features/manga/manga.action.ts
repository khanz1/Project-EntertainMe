'use server';

import { APP } from '@/constant';
import {
  CoverCollection,
  FetchMangaOptions,
  MangaCollection,
  MangaResponse,
  MangaStatisticsResponse,
} from '@/features/manga/manga.type';
import { ChapterCollection, ChapterResponse, FetchChapterOptions } from '@/features/manga/types/chapter.type';

/**
 * Fetches a list of manga from the MangaDex API based on the provided options.
 *
 * This function sends a GET request to the MangaDex API to retrieve a list of manga.
 * It applies various search parameters to filter and order the results.
 *
 * @param {FetchMangaOptions} options - The options to configure the fetch request.
 * @param {number} options.pageSize - The number of manga to fetch per page.
 * @param {number} options.page - The page number to fetch.
 * @param {string} options.searchTerm - The search term to filter the manga titles.
 * @returns {Promise<MangaCollection>} A promise that resolves to the MangaCollection response from the MangaDex API.
 */
export const fetchManga = async (options: FetchMangaOptions): Promise<MangaCollection> => {
  const limit: string = (options.pageSize || 10).toString();
  const offset: string = (options.pageSize * (options.page - 1)).toString();
  const search = options.searchTerm || '';
  const contentRatingList = options.contentRatingList || [];

  const HOST = APP.MANGADEX_API_URL;
  const url = new URL(`${HOST}/manga`);

  url.searchParams.append('limit', limit);
  url.searchParams.append('offset', offset);
  url.searchParams.append('title', search);
  url.searchParams.append('includedTagsMode', 'AND');
  url.searchParams.append('excludedTagsMode', 'OR');
  // url.searchParams.append('contentRating[]', 'safe');
  // url.searchParams.append('contentRating[]', 'suggestive');
  // url.searchParams.append('contentRating[]', 'erotica');
  url.searchParams.append('order[rating]', 'desc');
  for (const contentRating of contentRatingList) {
    url.searchParams.append('contentRating[]', contentRating);
  }

  const res = await fetch(url.toString());

  return await res.json();
};

/**
 * Fetches the cover image information for a manga from the MangaDex API.
 *
 * This function sends a GET request to the MangaDex API to retrieve the cover image information
 * for a specific manga based on the provided cover ID.
 *
 * @param {string} coverId - The ID of the manga cover to fetch.
 * @returns {Promise<CoverCollection>} A promise that resolves to the JSON response containing cover image information.
 */
export const fetchMangaCover = async (coverId: string): Promise<CoverCollection> => {
  const HOST = APP.MANGADEX_API_URL;
  const url = new URL(`${HOST}/cover/${coverId}`);

  const res = await fetch(url.toString());

  return await res.json();
};

/**
 * Fetches manga details from the MangaDex API based on the provided manga ID.
 *
 * This function sends a GET request to the MangaDex API to retrieve detailed information
 * for a specific manga identified by its ID.
 *
 * @param {string} mangaId - The ID of the manga to fetch details for.
 * @returns {Promise<MangaResponse>} A promise that resolves to the MangaCollection response from the MangaDex API.
 */
export const fetchMangaByMangaId = async (mangaId: string): Promise<MangaResponse> => {
  const HOST = APP.MANGADEX_API_URL;
  const url = new URL(`${HOST}/manga/${mangaId}`);

  const res = await fetch(url.toString());

  return await res.json();
};

/**
 * Fetches manga statistics from the MangaDex API based on the provided manga ID.
 *
 * This function sends a GET request to the MangaDex API to retrieve statistics
 * for a specific manga identified by its ID.
 *
 * @param {string} mangaId - The ID of the manga to fetch statistics for.
 * @returns {Promise<MangaStatisticsResponse>} A promise that resolves to the MangaStatisticsResponse from the MangaDex API.
 */
export const fetchStatisticsByMangaId = async (mangaId: string): Promise<MangaStatisticsResponse> => {
  const HOST = APP.MANGADEX_API_URL;
  const url = new URL(`${HOST}/statistics/manga/${mangaId}`);

  const res = await fetch(url.toString());

  return await res.json();
};

/**
 * Fetches a list of manga chapters from the MangaDex API based on the provided options.
 *
 * This function sends a GET request to the MangaDex API to retrieve a list of chapters
 * for a specific manga identified by its ID. It applies various search parameters to
 * filter and order the results.
 *
 * @param {FetchChapterOptions} params - The options to configure the fetch request.
 * @param {number} params.pageSize - The number of chapters to fetch per page.
 * @param {number} params.page - The page number to fetch.
 * @param {string} params.mangaId - The ID of the manga to fetch chapters for.
 * @returns {Promise<ChapterCollection>} A promise that resolves to the ChapterCollection response from the MangaDex API.
 */
export const fetchMangaChapterList = async (params: FetchChapterOptions): Promise<ChapterCollection> => {
  const limit = (params.pageSize || 10).toString();
  const offset = (params.pageSize * (params.page - 1)).toString();

  const url = new URL(APP.MANGADEX_API_URL + '/chapter');
  url.searchParams.set('limit', limit);
  url.searchParams.set('offset', offset);
  url.searchParams.set('manga', params.mangaId);
  url.searchParams.set('translatedLanguage[]', 'en');
  // url.searchParams.set('volume', params.volume.toString());
  url.searchParams.append('contentRating[]', 'safe');
  url.searchParams.append('contentRating[]', 'suggestive');
  url.searchParams.append('contentRating[]', 'erotica');
  url.searchParams.set('includeFutureUpdates', '1');
  url.searchParams.set('order[createdAt]', 'asc');
  url.searchParams.set('order[updatedAt]', 'asc');
  url.searchParams.set('order[publishAt]', 'asc');
  url.searchParams.set('order[readableAt]', 'asc');
  url.searchParams.set('order[volume]', 'asc');
  url.searchParams.set('order[chapter]', 'asc');

  const res = await fetch(url.toString());

  return await res.json();
};


/**
 * Fetches detailed information about a manga chapter from the MangaDex API based on the provided chapter ID.
 *
 * This function sends a GET request to the MangaDex API to retrieve detailed information
 * for a specific chapter identified by its ID.
 *
 * @param {string} chapterId - The ID of the chapter to fetch details for.
 * @returns {Promise<ChapterResponse>} A promise that resolves to the ChapterResponse from the MangaDex API.
 */
export const fetchChapterById = async (chapterId: string): Promise<ChapterResponse> => {
  const url = new URL(`${APP.MANGADEX_API_URL}/at-home/server/${chapterId}`);
  url.searchParams.set('forcePort443', 'true');

  const res = await fetch(url.toString());

  return await res.json();
};