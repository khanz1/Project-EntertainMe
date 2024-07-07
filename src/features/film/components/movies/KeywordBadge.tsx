import { Badge, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { fetchKeywords } from '@/features/film/actions/film.action';
import { FILM_TYPE } from '@/features/film/types/film.type';

export type KeywordBadgeProps<T> = {
  type: T extends FILM_TYPE.MOVIE ? FILM_TYPE.MOVIE : FILM_TYPE.TV_SERIES,
  movieOrTVId: number
}

export const KeywordBadge = async <T extends FILM_TYPE>({ type, movieOrTVId }: KeywordBadgeProps<T>) => {
  const data = await fetchKeywords(type, movieOrTVId);
  const keywords = 'results' in data ? data.results : data.keywords;

  if (!keywords.length) {
    return null;
  }

  return (
    <Stack>
      <Text fw="bold">Keyword</Text>
      <Group gap="xs">
        {keywords.map(keyword => (
          <Badge variant="light" radius="sm" key={keyword.id}>
            {keyword.name}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
};