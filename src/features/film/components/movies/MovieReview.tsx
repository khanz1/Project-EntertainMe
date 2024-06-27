import { Stack, Text } from '@mantine/core';
import { Comment } from '@/features/film/components/Comment';
import { fetchReviews } from '@/features/film/actions/movie.action';
import { FILM_TYPE } from '@/features/film/types/film.type';

export type MovieReviewProps = {
  movieId: number;
}

export const MovieReview = async ({ movieId }: MovieReviewProps) => {
  const reviews = await fetchReviews(movieId, FILM_TYPE.MOVIE);
  if (!reviews.total_results) {
    return null;
  }

  return (
    <Stack gap="md">
      <Text size="xl" fw="bold">
        Comments
      </Text>
      {reviews.results
        .toSorted((a, b) => b.created_at < a.created_at ? -1 : 1)
        .map((review) => (
          <Comment key={review.id} review={review} />
        ))}
    </Stack>
  );
};