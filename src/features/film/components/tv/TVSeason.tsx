'use client';
import { TVSeriesDetail } from '@/features/film/types/series.type';
import { Box, Button, Drawer, Group, NativeSelect, Stack, Text } from '@mantine/core';
import classes from '../Detail.module.css';
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
        // title={
        //   <Group justify="space-between">
        //     <Text size="xl" fw="bold">
        //       Seasons
        //     </Text>
        //
        //     <NativeSelect
        //       value={String(seasonNumber)}
        //       data={tvSeries.seasons.map((tv) => ({
        //         label: tv.name,
        //         value: String(tv.season_number),
        //       }))}
        //       onChange={(event) => {
        //         setSeasonNumber(Number(event.target.value));
        //       }}
        //     />
        //   </Group>
        // }
      >
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title component={Group}>
              {/*<Text size="xl" fw="bold">*/}
              {/*  Seasons*/}
              {/*</Text>*/}

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
            {/*<Group wrap="nowrap" gap={0}>*/}
            {/*  <Image*/}
            {/*    height={200}*/}
            {/*    src={getTmdbImage(tvSeries.seasons[seasonNumber].poster_path)}*/}
            {/*    alt={tvSeries.seasons[seasonNumber].name}*/}
            {/*  />*/}
            {/*  <Box px="md" w="100%" className={classes.cardBody}>*/}
            {/*    <Group justify="space-between" wrap="nowrap">*/}
            {/*      <Text className={classes.title} tt="uppercase" lineClamp={1} fw={700}>*/}
            {/*        {tvSeries.seasons[seasonNumber].name}*/}
            {/*      </Text>*/}
            {/*      <Text>{tvSeries.seasons[seasonNumber].episode_count}E</Text>*/}
            {/*    </Group>*/}
            {/*    <Text mt="xs" mb="md" lineClamp={4}>*/}
            {/*      {tvSeries.seasons[seasonNumber].overview}*/}
            {/*    </Text>*/}
            {/*  </Box>*/}
            {/*</Group>*/}
            {/*<Accordion variant="filled" radius="md" defaultValue="Apples" chevron={null} transitionDuration={1000}>*/}
            {/*  {tvSeries.seasons*/}
            {/*    .map(season => {*/}
            {/*      return (*/}
            {/*        <Accordion.Item key={season.id} value={season.id.toString()}>*/}
            {/*          <Accordion.Control>*/}
            {/*            <SeasonCard season={season} key={season.id} />*/}
            {/*          </Accordion.Control>*/}
            {/*          <Accordion.Panel pl="xl">*/}
            {/*            <EpisodeList tvSeries={tvSeries} seasonNumber={season.season_number} />*/}
            {/*          </Accordion.Panel>*/}
            {/*        </Accordion.Item>*/}
            {/*      )*/}
            {/*        ;*/}
            {/*    })}*/}
            {/*</Accordion>*/}
            {/*{tvSeries.seasons*/}
            {/*  .map(season => {*/}
            {/*    return <EpisodeList key={season.id} tvSeries={tvSeries} seasonNumber={season.season_number} />;*/}
            {/*  })}*/}

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
            .filter((_, i) => {
              return i < 3;
            })
            .map(season => {
              return <SeasonCard season={season} key={season.id} />;
            })}
        </Stack>
      </Box>
    </Box>
  );
};