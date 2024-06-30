import { Badge, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { fetchKeywords } from '@/features/film/actions/film.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { WrapperProps } from '@/features/film/components/movies/MovieWrapper';


export const KeywordBadge = async ({ movieId }: WrapperProps) => {
  const keywords = await fetchKeywords(FILM_TYPE.MOVIE, movieId);

  if (!keywords.keywords.length) {
    return null;
  }

  return (
    <Stack>
      <Text fw="bold">Keyword</Text>
      <Group gap="xs">
        {keywords.keywords.map(keyword => (
          <Badge variant="light" radius="sm" key={keyword.id}>
            {keyword.name}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
};