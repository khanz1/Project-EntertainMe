'use client';
import { Box, Group, NativeSelect } from '@mantine/core';
import { TVSeriesDetail } from '../types/series.type';
import { useEffect, useState } from 'react';
import { fetchSeasonByTvId } from '../film.action';
import { Season } from '../types/movie.type';
import { EpisodeCard } from './EpisodeCard';
import Link from 'next/link';

export type SeasonSectionProps = {
  tvSeries: TVSeriesDetail;
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

export const SeasonSection = ({ tvSeries }: SeasonSectionProps) => {
  const [season, setSeason] = useState<Season>(defaultSeason);
  const [seasonNumber, setSeasonNumber] = useState(1);

  useEffect(() => {
    fetchSeasonByTvId(tvSeries.id, seasonNumber).then((data) => {
      setSeason(data);
    });
  }, [tvSeries.id, seasonNumber]);

  return (
    <Box>
      <NativeSelect
        value={String(seasonNumber)}
        data={tvSeries.seasons.map((tv) => ({
          label: tv.name,
          value: String(tv.season_number),
        }))}
        onChange={(event) => {
          setSeasonNumber(Number(event.target.value));
        }}
      />
      <Group mt="xl" justify="center" wrap="wrap" gap="sm">
        {season.episodes.map((episode) => (
          <Box
            component={Link}
            w="100%"
            key={episode.id}
            href={`/watch/${tvSeries.id}?s=${seasonNumber}&e=${seasonNumber}`}
            style={{ textDecoration: 'none' }}
          >
            <EpisodeCard episode={episode} />
          </Box>
        ))}
      </Group>
    </Box>
  );
};
