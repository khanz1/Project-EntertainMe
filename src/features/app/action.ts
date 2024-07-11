'use server';

import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';
import { FILM_FILTERS, ResData, Review } from '@/features/film/types/film.type';
import { Movie, MovieDetail } from '@/features/film/types/movie.type';
import { checkStreamAvailability, fetchMovieById, fetchMovies } from '@/features/film/actions/movie.action';
import {
  fetchFilmCredits,
  fetchFilmImages,
  fetchFilmVideos,
  fetchRecommendations,
  fetchReviews,
} from '@/features/film/actions/film.action';
import { ItemType } from '@prisma/client';
import { MovieRecommendation } from '@/features/film/types/recommendation.type';
import { MovieCredit } from '@/features/film/types/credits.type';
import { VideoResponse } from '@/features/film/types/video.type';
import { ImageCollection } from '@/features/film/types/image.type';
import { fetchTVSeriesById } from '@/features/film/actions/tv.action';
import { TVSeriesDetail } from '@/features/film/types/series.type';

export type PopularAndTopMoviesResponse = {
  popular: ResData<Movie[]>;
  topRated: ResData<Movie[]>;
};
export const fetchPopularAndTopMovies = async (): Promise<PopularAndTopMoviesResponse> => {
  cookies();
  const KV_KEY = `page:home:popular-and-top-movies`;
  const cache = await kv.get(KV_KEY);
  if (cache) {
    return cache as PopularAndTopMoviesResponse;
  }

  const [popular, topRated] = await Promise.all([
    fetchMovies({ page: 1, filter: FILM_FILTERS.POPULAR }),
    fetchMovies({ page: 1, filter: FILM_FILTERS.TOP_RATED }),
  ]);
  await kv.set(KV_KEY, { popular, topRated });

  return { popular, topRated };
};

export type DetailMoviePageResponse = {
  movie: MovieDetail;
  recommendations: ResData<MovieRecommendation[]>;
  credit: MovieCredit;
  reviews: ResData<Review[]>;
  videos: VideoResponse;
  images: ImageCollection;
  isStreamAvailable: boolean;
};

export const fetchDetailMoviePage = async ({ movieId }: { movieId: number }): Promise<DetailMoviePageResponse> => {
  cookies();
  const KV_KEY = `page:movie:${movieId}`;
  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as DetailMoviePageResponse;
  }

  const [movie, recommendations, credit, reviews, videos, images, isStreamAvailable] = await Promise.all([
    fetchMovieById(movieId),
    fetchRecommendations(ItemType.movie, movieId),
    fetchFilmCredits(ItemType.movie, movieId),
    fetchReviews(ItemType.movie, movieId),
    fetchFilmVideos(ItemType.movie, movieId),
    fetchFilmImages(ItemType.movie, movieId),
    checkStreamAvailability({
      type: ItemType.movie,
      movieId,
    }),
  ]);

  const data = {
    movie,
    recommendations,
    credit,
    reviews,
    videos,
    images,
    isStreamAvailable,
  };

  await kv.set(KV_KEY, data);

  return data;
};

export type DetailTVPageResponse = {
  tvSeries: TVSeriesDetail;
  recommendations: ResData<MovieRecommendation[]>;
  credit: MovieCredit;
  reviews: ResData<Review[]>;
  videos: VideoResponse;
  images: ImageCollection;
};

export const fetchDetailTVPage = async ({ tvSeriesId }: { tvSeriesId: number }): Promise<DetailTVPageResponse> => {
  cookies();
  const KV_KEY = `page:tv:${tvSeriesId}`;
  const cache = await kv.get(KV_KEY);

  if (cache) {
    return cache as DetailTVPageResponse;
  }

  const [tvSeries, recommendations, credit, reviews, videos, images] = await Promise.all([
    fetchTVSeriesById(tvSeriesId),
    fetchRecommendations(ItemType.tv, tvSeriesId),
    fetchFilmCredits(ItemType.tv, tvSeriesId),
    fetchReviews(ItemType.tv, tvSeriesId),
    fetchFilmVideos(ItemType.tv, tvSeriesId),
    fetchFilmImages(ItemType.tv, tvSeriesId),
  ]);

  const data = {
    tvSeries,
    recommendations,
    credit,
    reviews,
    videos,
    images,
  };

  await kv.set(KV_KEY, data);

  return data;
};
