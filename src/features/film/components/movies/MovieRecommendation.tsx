import { Box, Group, ScrollArea, Text } from '@mantine/core';
import { MovieRecommendationCard } from '@/features/film/components/movies/MovieRecommendationCard';
import React from 'react';
import { type MovieRecommendation as TMovieRecommendation } from '@/features/film/types/recommendation.type';
import { ResData } from '@/features/film/types/film.type';

export type MovieRecommendationProps = {
  recommendations: ResData<TMovieRecommendation[]>
}

export const MovieRecommendation = ({ recommendations }: MovieRecommendationProps) => {
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
              <MovieRecommendationCard recommendation={recommendation} key={recommendation.id} />
            ))}
        </Group>
      </ScrollArea>
    </Box>
  );
};