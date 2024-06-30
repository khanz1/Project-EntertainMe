'use client';

import { Box, Button, Drawer, Group, Stack, Text } from '@mantine/core';
import { Comment } from '@/features/film/components/Comment';
import { fetchReviews } from '@/features/film/actions/movie.action';
import { FILM_TYPE, ResData, Review } from '@/features/film/types/film.type';
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/features/film/components/movies/MovieDetail.module.css';
import { IconArrowRight } from '@tabler/icons-react';

export type MovieReviewProps = {
  movieId: number;
}
const REVIEW_SHOWN = 3;
export const MovieReview = ({ movieId }: MovieReviewProps) => {
  const [isDrawerOpen, drawer] = useDisclosure(false);
  const [reviews, setReviews] = useState<ResData<Review[]>>({
    total_results: 0,
    results: [],
    page: 0,
    total_pages: 0,
  });
  useEffect(() => {
    (async () => {
      const data = await fetchReviews(movieId, FILM_TYPE.MOVIE);
      setReviews(data);
    })();
  }, [movieId]);

  if (!reviews.total_results) {
    return null;
  }

  return (
    <Box>
      <Drawer opened={isDrawerOpen} onClose={drawer.close} size="xl" position="right"
              title={`Reviews`}>
        <Stack gap="md">
          {reviews.results
            .toSorted((a, b) => b.created_at < a.created_at ? -1 : 1)
            .map((review) => (
              <Comment key={review.id} review={review} />
            ))}
        </Stack>
      </Drawer>
      <Group justify="space-between">
        <Text size="xl" my="lg" fw="bold">
          Comments ({reviews.results.length})
        </Text>
        {reviews.results.length > REVIEW_SHOWN && (
          <Button variant="transparent" onClick={drawer.open}
                  className={classes.title} fw={500}>
            View More <IconArrowRight />
          </Button>
        )}
      </Group>
      <Stack gap="md">
        {reviews.results
          // .toSorted((a, b) => b.created_at < a.created_at ? -1 : 1)
          .filter((_, i) => i < REVIEW_SHOWN)
          .map((review) => (
            <Comment key={review.id} review={review} />
          ))}
      </Stack>
    </Box>
  );
};