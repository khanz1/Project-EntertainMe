'use client';
import { Box, Button, Drawer, Group, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import { MovieCastCard } from '@/features/film/components/movies/MovieCastCard';
import { MovieCrewCard } from '@/features/film/components/movies/MovieCrewCard';
import classes from '@/features/film/components/movies/MovieDetail.module.css';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useState } from 'react';
import { CAST_TAB } from '@/features/film/components/movies/MovieDetail';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Crew, MovieCredit as TMovieCredit } from '@/features/film/types/credits.type';
import { MOBILE_BREAKPOINT } from '@/constant';

export const MovieCredit = ({ credit }: { credit: TMovieCredit }) => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [isCastOpened, cast] = useDisclosure(false);
  const [castActiveTab, setCastActiveTab] = useState<CAST_TAB>(CAST_TAB.CAST);

  const crewList = credit.crew
    .reduce((acc: Record<string, Crew[]>, crew) => {
      if (!acc[crew.job]) {
        acc[crew.job] = [];
      }
      acc[crew.job].push(crew);
      return acc;
    }, {});

  return (
    <Box>
      <Drawer
        opened={isCastOpened}
        onClose={cast.close}
        size="xl"
        position="right"
        title="Cast"
      >
        <Tabs value={castActiveTab} onChange={(v) => setCastActiveTab(v as CAST_TAB)}>
          <Tabs.List grow>
            <Tabs.Tab value={CAST_TAB.CAST}>
              {CAST_TAB.CAST} ({credit.cast.length})
            </Tabs.Tab>
            <Tabs.Tab value={CAST_TAB.CREW}>
              {CAST_TAB.CREW} ({credit.crew.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={CAST_TAB.CAST}>
            <Group justify="space-between" py="lg">
              {credit.cast
                .map(cast => (
                  <MovieCastCard cast={cast} key={cast.credit_id} cardWidth={isMobile ? 180 : undefined} />
                ))}
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value={CAST_TAB.CREW}>
            <Stack py="lg">
              {Object.keys(crewList).map(crewJob => {
                return (
                  <Stack key={crewJob}>
                    <Text size="xl" fw="bold">{crewJob}</Text>
                    <Group gap="md">
                      {crewList[crewJob]
                        .map(crew => (
                          <MovieCrewCard crew={crew} key={crew.credit_id} cardWidth={isMobile ? 180 : undefined} />
                        ))}
                    </Group>
                  </Stack>
                );
              })}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Drawer>
      {Boolean(credit.cast.length) && (
        <Box mt="lg">
          <Group justify="space-between">
            <Text size="xl" fw="bold">
              Cast ({credit.cast.length + credit.crew.length})
            </Text>
            <Button
              variant="transparent"
              onClick={cast.open}
              className={classes.title} fw={500}
            >
              View More <IconArrowRight />
            </Button>
          </Group>
          <Text pb="md">
            Top billed cast, displaying the actors in their respective roles.
          </Text>
          <ScrollArea offsetScrollbars>
            <Group wrap="nowrap">
              {credit.cast
                .filter((_, i) => i < 5)
                .map(cast => (
                  <MovieCastCard cast={cast} key={cast.credit_id} />
                ))}
            </Group>
          </ScrollArea>
        </Box>
      )}
    </Box>
  );
};