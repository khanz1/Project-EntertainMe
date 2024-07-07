'use client';
import { useEffect, useState } from 'react';
import { Box, Group } from '@mantine/core';
import { TVSeriesDetail } from '@/features/film/types/series.type';
import { fetchSeasonByTvId } from '@/features/film/film.action';
import { EpisodeCard } from '@/features/film/components/EpisodeCard';
import { Season } from '@/features/film/types/movie.type';

export type SeasonSectionProps = {
  tvSeries: TVSeriesDetail;
  seasonNumber: number;
};

export const defaultSeason: Season = {
  _id: '',
  air_date: '',
  episodes: [],
  name: '',
  overview: '',
  id: 0,
  poster_path: '',
  season_number: 0,
  vote_average: 0,
};

export const EpisodeList = ({ tvSeries, seasonNumber }: SeasonSectionProps) => {
  const [season, setSeason] = useState<Season>(defaultSeason);

  useEffect(() => {
    fetchSeasonByTvId(tvSeries.id, seasonNumber).then((data) => {
      setSeason(data);
    });
  }, [tvSeries.id, seasonNumber]);

  return (
    <Group mt="xl" justify="center" wrap="wrap" gap="sm">
      {season.episodes.map((episode) => (
        <Box w="100%" key={episode.id}>
          <EpisodeCard tvSeries={tvSeries} episode={episode} seasonNumber={seasonNumber} />
        </Box>
      ))}
    </Group>
  );
};
