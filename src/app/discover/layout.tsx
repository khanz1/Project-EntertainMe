// 'use client';

import { Box, Container, rem, Stack, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { IconBook, IconDeviceTv, IconMovie } from '@tabler/icons-react';
import React from 'react';
import classes from './layout.module.css';
import { DiscoverEntertain } from '@/features/app/DiscoverEntertain';

type LayoutProps = {
  manga: React.ReactNode;
  movies: React.ReactNode;
  tv: React.ReactNode;
};

export default function Layout({ manga, movies, tv }: LayoutProps) {
  // const router = useRouter();
  // const pathname = usePathname();
  // const pathList = pathname.split('/');
  // if (pathList.length > 2) {
  //   return children;
  // }

  const iconStyle = { width: rem(12), height: rem(12) };
  // return (
  //   <Container size="xxl" py="xl">
  //     <Grid>
  //       <GridCol span={{ base: 12, sm: 2 }}>
  //         <ButtonGroup orientation="vertical" m="auto">
  //           <Button component={Link} href="/@movies" variant="default">
  //             Movies
  //           </Button>
  //           <Button component={Link} href="/@tv" variant="default">
  //             TV Series
  //           </Button>
  //           <Button component={Link} href="/@manga" variant="default">
  //             Manga
  //           </Button>
  //         </ButtonGroup>
  //       </GridCol>
  //       <GridCol span={{ base: 12, sm: 10 }}>{children}</GridCol>
  //     </Grid>
  //   </Container>
  // );

  return (
    <Container size="xl" py="xl" m="auto">
      <Stack>
        <Box w="50%" m="auto">
          <DiscoverEntertain />
        </Box>
        <Tabs variant="pills" defaultValue="movies" orientation="vertical" classNames={classes}>
          <TabsList>
            <TabsTab value="movies" leftSection={<IconMovie style={iconStyle} />}>
              Movies
            </TabsTab>
            <TabsTab value="tv" leftSection={<IconDeviceTv style={iconStyle} />}>
              TV Series
            </TabsTab>
            <TabsTab value="manga" leftSection={<IconBook style={iconStyle} />}>
              Manga
            </TabsTab>
          </TabsList>

          <TabsPanel value="movies">{movies}</TabsPanel>
          <TabsPanel value="tv">{tv}</TabsPanel>
          <TabsPanel value="manga">{manga}</TabsPanel>
        </Tabs>
      </Stack>
    </Container>
  );
}

// GET https://zoroxtv.to/ajax/server/list/Hj-YDs4h,Hj-YDs4u,Hj-WAsMn?vrf=Q0BkVTlFZ1VUPFNnfj12VDtYLVtnQVNTdllCWIBeVFGAWHdYTkVTUDZRVWZNMFNXTWdRU1VBaWA%3D