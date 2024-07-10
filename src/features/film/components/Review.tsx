'use client';

import { Box, Button, Drawer, Group, Stack, Text } from '@mantine/core';
import { Comment } from '@/features/film/components/Comment';
import type { ResData, Review as TReview } from '@/features/film/types/film.type';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/features/film/styles/Detail.module.css';
import { IconArrowRight } from '@tabler/icons-react';

export type ReviewProps = {
  reviews: ResData<TReview[]>;
};

const REVIEW_SHOWN = 3;
export const Review = ({ reviews }: ReviewProps) => {
  const [isDrawerOpen, drawer] = useDisclosure(false);

  if (!reviews.total_results) {
    return null;
  }

  return (
    <Box>
      <Drawer
        opened={isDrawerOpen}
        onClose={drawer.close}
        size="xl"
        position="right"
        title={`Reviews`}
        overlayProps={{
          //    backgroundOpacity={0.5} blur={4}
          backgroundOpacity: 0.5,
          blur: 4,
        }}
      >
        <Stack gap="md">
          {reviews.results
            .toSorted((a, b) => (b.created_at < a.created_at ? -1 : 1))
            .map(review => (
              <Comment key={review.id} review={review} />
            ))}
        </Stack>
      </Drawer>
      <Group justify="space-between">
        <Text size="xl" my="lg" fw="bold">
          Comments ({reviews.results.length})
        </Text>
        {reviews.results.length > REVIEW_SHOWN && (
          <Button variant="transparent" onClick={drawer.open} className={classes.title} fw={500}>
            View More <IconArrowRight />
          </Button>
        )}
      </Group>
      <Stack gap="md">
        {/* TODO: should be sorted from the most popular comment */}
        {reviews.results
          .filter((_, i) => i < REVIEW_SHOWN)
          .map(review => (
            <Comment key={review.id} review={review} />
          ))}
      </Stack>
    </Box>
  );
};
