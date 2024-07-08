'use client';
import { Box, Button, Drawer, Group, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import classes from '@/features/film/styles/Detail.module.css';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Crew, MovieCredit as TMovieCredit } from '@/features/film/types/credits.type';
import { PersonCard } from '@/features/film/components/PersonCard';

export enum TAB {
  CAST = 'Cast',
  CREW = 'Crew',
}

export type CreditProps = {
  credit: TMovieCredit;
}

export const Credit = ({ credit }: CreditProps) => {
  const [isDrawerOpen, drawer] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<TAB>(TAB.CAST);

  const crewList = credit.crew
    .reduce((acc: Record<string, Crew[]>, crew) => {
      if (!acc[crew.job]) {
        acc[crew.job] = [];
      }
      acc[crew.job].push(crew);
      return acc;
    }, {});

  if (!credit.cast.length) {
    return null;
  }

  return (
    <Box>
      <Drawer
        opened={isDrawerOpen}
        onClose={drawer.close}
        size="xl"
        position="right"
        title="Cast"
      >
        <Tabs value={activeTab} onChange={(v) => setActiveTab(v as TAB)}>
          <Tabs.List grow>
            <Tabs.Tab value={TAB.CAST}>
              {TAB.CAST} ({credit.cast.length})
            </Tabs.Tab>
            <Tabs.Tab value={TAB.CREW}>
              {TAB.CREW} ({credit.crew.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={TAB.CAST}>
            <Group justify="space-between" py="lg" gap="xs">
              {credit.cast
                .map(cast => (
                  <PersonCard
                    key={cast.credit_id}
                    person={cast}
                    description={`as ${cast.character}`}
                  />
                ))}
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value={TAB.CREW}>
            <Stack py="lg">
              {Object.keys(crewList).map(job => (
                <Stack key={job}>
                  <Text size="xl" fw="bold">{job}</Text>
                  <Group gap="md">
                    {crewList[job]
                      .map(crew => (
                        <PersonCard
                          key={crew.credit_id}
                          person={crew}
                          description={`as ${crew.job}`}
                        />
                      ))}
                  </Group>
                </Stack>
              ))}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Drawer>
      <Box mt="lg">
        <Group justify="space-between">
          <Text size="xl" fw="bold">
            Cast ({credit.cast.length + credit.crew.length})
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
          Top billed cast, displaying the actors in their respective roles.
        </Text>
        <ScrollArea offsetScrollbars>
          <Group wrap="nowrap">
            {credit.cast
              // faster than filter, because we create a fix array length
              .slice(0, 5)
              .map(cast => (
                <PersonCard
                  key={cast.credit_id}
                  person={cast}
                  description={`as ${cast.character}`}
                />
              ))}
          </Group>
        </ScrollArea>
      </Box>
    </Box>
  );
};