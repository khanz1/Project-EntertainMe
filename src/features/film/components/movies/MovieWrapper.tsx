import { fetchFilmImages, fetchFilmVideos, fetchReviews } from '@/features/film/actions/movie.action';
import { MovieReview } from '@/features/film/components/movies/MovieReview';
import { fetchFilmCredits, fetchRecommendations } from '@/features/film/actions/film.action';
import { MovieCredit } from '@/features/film/components/movies/MovieCast';
import { MovieMedia } from '@/features/film/components/movies/MovieMedia';
import { MovieRecommendation } from '@/features/film/components/movies/MovieRecommendation';
import { ItemType } from '@prisma/client';

export type WrapperProps = {
  type: typeof ItemType.movie | typeof ItemType.tv;
  movieOrTVId: number;
}

export const ReviewWrapper = async ({ type, movieOrTVId }: WrapperProps) => {
  const reviews = await fetchReviews(type, movieOrTVId);

  if (!reviews.total_results) {
    return null;
  }

  return <MovieReview reviews={reviews} />;
};


export const CreditWrapper = async ({ type, movieOrTVId }: WrapperProps) => {
  const credit = await fetchFilmCredits(type, movieOrTVId);

  if (!credit.cast.length) {
    return null;
  }

  return <MovieCredit credit={credit} />;
};

export const MediaWrapper = async ({ type, movieOrTVId }: WrapperProps) => {
  const [videos, images] = await Promise.all([
    fetchFilmVideos(type, movieOrTVId),
    fetchFilmImages(type, movieOrTVId),
  ]);

  if (!videos.results.length && !images.backdrops.length && !images.posters.length && !images.logos.length) {
    return null;
  }

  return <MovieMedia videos={videos} images={images} />;
};

export const RecommendationWrapper = async ({ type, movieOrTVId }: WrapperProps) => {
  const recommendations = await fetchRecommendations(type, movieOrTVId);

  if (!recommendations.results.length) {
    return null;
  }

  return <MovieRecommendation recommendations={recommendations} />;
};