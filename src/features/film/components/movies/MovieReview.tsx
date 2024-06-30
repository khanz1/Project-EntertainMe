'use client';

import { Box, Button, Drawer, Group, Stack, Text } from '@mantine/core';
import { Comment } from '@/features/film/components/Comment';
import { ResData, Review } from '@/features/film/types/film.type';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/features/film/components/movies/MovieDetail.module.css';
import { IconArrowRight } from '@tabler/icons-react';

export type MovieReviewProps = {
  reviews: ResData<Review[]>
}
const REVIEW_SHOWN = 3;
export const MovieReview = ({ reviews }: MovieReviewProps) => {
  const [isDrawerOpen, drawer] = useDisclosure(false);

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