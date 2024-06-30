import { fetchFilmImages, fetchFilmVideos, fetchReviews } from '@/features/film/actions/movie.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { MovieReview } from '@/features/film/components/movies/MovieReview';
import { fetchFilmCredits, fetchRecommendations } from '@/features/film/actions/film.action';
import { MovieCredit } from '@/features/film/components/movies/MovieCast';
import { MovieMedia } from '@/features/film/components/movies/MovieMedia';
import { MovieRecommendation } from '@/features/film/components/movies/MovieRecommendation';

export type WrapperProps = {
  movieId: number
}

export const ReviewWrapper = async ({ movieId }: WrapperProps) => {
  const reviews = await fetchReviews(movieId, FILM_TYPE.MOVIE);

  if (!reviews.total_results) {
    return null;
  }

  return <MovieReview reviews={reviews} />;
};


export const CreditWrapper = async ({ movieId }: WrapperProps) => {
  const credit = await fetchFilmCredits(FILM_TYPE.MOVIE, movieId);

  if (!credit.cast.length) {
    return null;
  }

  return <MovieCredit credit={credit} />;
};

export const MediaWrapper = async ({ movieId }: WrapperProps) => {
  const [videos, images] = await Promise.all([
    fetchFilmVideos(FILM_TYPE.MOVIE, movieId),
    fetchFilmImages(FILM_TYPE.MOVIE, movieId),
  ]);

  if (!videos.results.length && !images.backdrops.length && !images.posters.length && !images.logos.length) {
    return null;
  }

  return <MovieMedia videos={videos} images={images} />;
};

export const RecommendationWrapper = async ({ movieId }: WrapperProps) => {
  const recommendations = await fetchRecommendations(FILM_TYPE.MOVIE, movieId);

  if (!recommendations.results) {
    return null;
  }

  return <MovieRecommendation recommendations={recommendations} />;
};