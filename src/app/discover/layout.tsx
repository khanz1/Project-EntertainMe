import { Box, Container, Grid, GridCol, rem, Stack, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { IconBook, IconDeviceTv, IconMovie } from '@tabler/icons-react';
import React from 'react';
import classes from './layout.module.css';
import { DiscoverEntertain } from '@/features/app/components/DiscoverEntertain';

type LayoutProps = {
  manga: React.ReactNode;
  movies: React.ReactNode;
  tv: React.ReactNode;
};

export default async function Layout({ manga, movies, tv }: LayoutProps) {
  const iconStyle = { width: rem(12), height: rem(12) };

  // await sleep(10000);

  return (
    <Container size="xl" m="auto" pt={rem(56)}>
      <Stack py="xl">
        <Box w={{ base: '100%', sm: '50%' }} m="auto">
          <DiscoverEntertain />
        </Box>
        <Tabs variant="pills" defaultValue="movies" orientation="vertical" classNames={classes}>
          <Grid w="100%">
            <GridCol span={{ base: 12, sm: 2 }}>
              <TabsList>
                <Grid gutter={0}>
                  <GridCol span={{ base: 4, sm: 12 }}>
                    <TabsTab my={0} value="movies" leftSection={<IconMovie style={iconStyle} />}>
                      Movies
                    </TabsTab>
                  </GridCol>
                  <GridCol span={{ base: 4, sm: 12 }}>
                    <TabsTab value="tv" leftSection={<IconDeviceTv style={iconStyle} />}>
                      TV Series
                    </TabsTab>
                  </GridCol>
                  <GridCol span={{ base: 4, sm: 12 }}>
                    <TabsTab value="manga" leftSection={<IconBook style={iconStyle} />}>
                      Manga
                    </TabsTab>
                  </GridCol>
                </Grid>
              </TabsList>
            </GridCol>

            <GridCol span={{ base: 12, sm: 10 }}>
              <TabsPanel value="movies">{movies}</TabsPanel>
              <TabsPanel value="tv">{tv}</TabsPanel>
              <TabsPanel value="manga">{manga}</TabsPanel>
            </GridCol>
          </Grid>
        </Tabs>
      </Stack>
    </Container>
  );
}
