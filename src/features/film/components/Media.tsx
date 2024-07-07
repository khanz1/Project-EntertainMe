'use client';
import { Box, Button, Drawer, Grid, Group, Image, ScrollArea, Select, Stack, Tabs, Text } from '@mantine/core';
import { VideoCard } from '@/features/film/components/movies/VideoCard';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import classes from './Detail.module.css';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { VideoResponse } from '@/features/film/types/video.type';
import { ImageCollection } from '@/features/film/types/image.type';

export type MediaProps = {
  videos: VideoResponse;
  images: ImageCollection;
}

export enum TAB {
  VIDEO = 'Videos',
  BACKDROP = 'Backdrops',
  POSTER = 'Posters',
  LOGO = 'Logos',
}

const TabModeList = ({ videos, images }: MediaProps) => {
  const [activeTab, setActiveTab] = useState<TAB>(TAB.VIDEO);

  return (
    <Tabs
      radius="xs"
      value={activeTab}
      onChange={value => {
        setActiveTab(value as TAB);
      }}
    >
      <Tabs.List grow>
        <Tabs.Tab value={TAB.VIDEO}>
          <Text>
            {TAB.VIDEO} ({videos.results.length})
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value={TAB.BACKDROP}>
          <Text>
            {TAB.BACKDROP} ({images.backdrops.length})
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value={TAB.POSTER}>
          <Text>
            {TAB.POSTER} ({images.posters.length})
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value={TAB.LOGO}>
          <Text>
            {TAB.LOGO} ({images.logos.length})
          </Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={TAB.VIDEO}>
        <ScrollArea scrollbars="x" offsetScrollbars py="md">
          <Stack>
            {videos.results.map(video => (
              <VideoCard video={video} key={video.id} />
            ))}
          </Stack>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value={TAB.BACKDROP}>
        <ScrollArea scrollbars="x" offsetScrollbars py="md">
          <Stack>
            {images.backdrops.map(backdrop => (
              <Image
                src={getTmdbImage(
                  backdrop.file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background Image'}
                key={backdrop.file_path}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value={TAB.POSTER}>
        <ScrollArea scrollbars="x" offsetScrollbars py="md">
          <Grid>
            {images.posters.map(poster => (
              <Grid.Col span={6} key={poster.file_path}>
                <Image
                  src={getTmdbImage(
                    poster.file_path,
                    ImageSize.ORIGINAL,
                  )}
                  alt={'Poster Image'}
                />
              </Grid.Col>
            ))}
          </Grid>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value={TAB.LOGO}>
        <ScrollArea scrollbars="x" offsetScrollbars py="md">
          <Stack>
            {images.logos.map(logo => (
              <Image
                src={getTmdbImage(
                  logo.file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background image'}
                key={logo.file_path}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Tabs.Panel>
    </Tabs>
  );
};

const OptionModeList = ({ videos, images }: MediaProps) => {
  const [value, setValue] = useState<TAB>(TAB.VIDEO);

  const results = useMemo(() => {
    switch (value) {
      case TAB.VIDEO:
        return videos.results;
      case TAB.BACKDROP:
        return images.backdrops;
      case TAB.POSTER:
        return images.posters;
      case TAB.LOGO:
        return images.logos;
    }
  }, [videos, images, value]);

  return (
    <Stack>
      <Select
        data={[
          { label: 'Videos', value: TAB.VIDEO },
          { label: 'Backdrops', value: TAB.BACKDROP },
          { label: 'Posters', value: TAB.POSTER },
          { label: 'Logos', value: TAB.LOGO },
        ]}
        value={value}
        onChange={val => setValue(val as TAB)}
      />
      <ScrollArea scrollbars="x" offsetScrollbars py="md">
        <Stack>
          {results.map((item: any) => {
            if (value === TAB.VIDEO) {
              return <VideoCard video={item} key={item.id} />;
            }
            return (
              <Image
                src={getTmdbImage(
                  item.file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background Image'}
                key={item.file_path}
              />
            );
          })}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export const Media = ({ videos, images }: MediaProps) => {
  const [isDrawerOpen, drawer] = useDisclosure(false);

  if (!videos.results.length && !images.backdrops.length && !images.posters.length && !images.logos.length) {
    return null;
  }

  return (
    <Box>
      <Drawer
        opened={isDrawerOpen}
        onClose={drawer.close}
        title="Media"
        size="xl"
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Box hiddenFrom="sm">
          <OptionModeList videos={videos} images={images} />
        </Box>
        <Box visibleFrom="sm">
          <TabModeList videos={videos} images={images} />
        </Box>
      </Drawer>
      <Stack gap={0}>
        <Group justify="space-between">
          <Text size="xl" fw="bold">
            Media ({videos.results.length})
          </Text>
          {videos.results.length > 3 && (
            <Button
              variant="transparent"
              onClick={drawer.open}
              className={classes.title}
              fw={500}
            >
              View More <IconArrowRight />
            </Button>
          )}
        </Group>
        <Text pb="md">Explore photos, videos, and other media related to the movie.</Text>
        <ScrollArea offsetScrollbars>
          <Group wrap="nowrap" gap="xs">
            {Boolean(videos.results.length) && (
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${videos.results[0].key}`}
                allow="fullscreen; autoplay"
                w={800}
                h={250}
                style={{ border: 0 }}
              ></Box>
            )}
            {Boolean(images.backdrops.length) && (
              <Image
                src={getTmdbImage(
                  images.backdrops[0].file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background Image'}
                height={250}
              />
            )}
            {Boolean(images.posters.length) && (
              <Image
                src={getTmdbImage(
                  images.posters[0].file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Poster Image'}
                height={250}
              />
            )}
          </Group>
        </ScrollArea>
      </Stack>
    </Box>
  );
};