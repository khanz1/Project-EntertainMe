import { Box, Group, ScrollArea, Text } from '@mantine/core';
import { RecommendationCard } from '@/features/film/components/RecommendationCard';
import React from 'react';
import { type MovieRecommendation as TMovieRecommendation } from '@/features/film/types/recommendation.type';
import { ResData } from '@/features/film/types/film.type';

export type RecommendationProps = {
  recommendations: ResData<TMovieRecommendation[]>
}

export const Recommendation = ({ recommendations }: RecommendationProps) => {
  if (!recommendations.results.length) {
    return null;
  }

  return (
    <Box mt="lg">
      <Group justify="space-between">
        <Text size="xl" fw="bold">
          Recommendation ({recommendations.results.length})
        </Text>
      </Group>
      <Text pb="md">
        Check out these recommended movies you might enjoy.
      </Text>
      <ScrollArea offsetScrollbars>
        <Group wrap="nowrap">
          {recommendations.results
            .map(recommendation => (
              <RecommendationCard recommendation={recommendation} key={recommendation.id} />
            ))}
        </Group>
      </ScrollArea>
    </Box>
  );
};