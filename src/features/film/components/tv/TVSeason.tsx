'use client';
import { TVSeriesDetail } from '@/features/film/types/series.type';
import { Box, Button, Drawer, Group, NativeSelect, Stack, Text } from '@mantine/core';
import classes from '@/features/film/styles/Detail.module.css';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { SeasonCard } from '@/features/film/components/tv/SeasonCard';
import { EpisodeList } from '@/features/film/components/tv/EpisodeList';

export type TVSeasonProps = {
  tvSeries: TVSeriesDetail;
}
export const TVSeason = ({ tvSeries }: TVSeasonProps) => {
  const [isDrawerOpen, drawer] = useDisclosure(false);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const season = useMemo(() => {
    return tvSeries.seasons
      .find((season) => season.season_number === seasonNumber);
  }, [seasonNumber, tvSeries.seasons]);
  return (
    <Box>
      <Drawer.Root
        opened={isDrawerOpen}
        onClose={drawer.close}
        size="xl"
        position="right"
      >
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title component={Group}>
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
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            {season ? (
              <EpisodeList key={season.id} tvSeries={tvSeries} seasonNumber={season.season_number} />
            ) : null}
          </Drawer.Body>
        </Drawer.Content>

      </Drawer.Root>
      <Box mt="lg">
        <Group justify="space-between">
          <Text size="xl" fw="bold">
            Season ({tvSeries.number_of_seasons})
          </Text>
          <Button
            variant="transparent"
            onClick={drawer.open}
            className={classes.title} fw={500}
          >
            View More <IconArrowRight />
          </Button>
        </Group>
        <Text pb="md">
          Explore the different seasons of the series.
        </Text>
        <Stack>
          {tvSeries.seasons
            .filter((season) => {
              return season.episode_count !== 0 && season.name !== 'Specials';
            })
            .slice(0, 3)
            .map(season => {
              return <SeasonCard season={season} key={season.id} />;
            })}
        </Stack>
      </Box>
    </Box>
  );
};