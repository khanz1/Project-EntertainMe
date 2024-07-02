'use client';
import { Box, Button, Drawer, Grid, Group, Image, ScrollArea, Select, Stack, Tabs, Text } from '@mantine/core';
import { VideoCard } from '@/features/film/components/movies/VideoCard';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import classes from '@/features/film/components/movies/MovieDetail.module.css';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useMemo, useState } from 'react';
import { MEDIA_TAB } from '@/features/film/components/movies/MovieDetail';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { VideoResponse } from '@/features/film/types/video.type';
import { ImageCollection } from '@/features/film/types/image.type';
import { MOBILE_BREAKPOINT } from '@/constant';

export type MovieMediaProps = {
  videos: VideoResponse;
  images: ImageCollection;
}

const TabModeList = ({ videos, images }: MovieMediaProps) => {
  const [activeTab, setActiveTab] = useState<MEDIA_TAB>(MEDIA_TAB.VIDEO);

  return (
    <Tabs
      radius="xs"
      value={activeTab}
      onChange={value => {
        setActiveTab(value as MEDIA_TAB);
      }}
    >
      <Tabs.List grow>
        <Tabs.Tab value={MEDIA_TAB.VIDEO}>
          <Text>
            {MEDIA_TAB.VIDEO} ({videos.results.length})
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value={MEDIA_TAB.BACKDROP}>
          <Text>
            {MEDIA_TAB.BACKDROP} ({images.backdrops.length})
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value={MEDIA_TAB.POSTER}>
          <Text>
            {MEDIA_TAB.POSTER} ({images.posters.length})
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value={MEDIA_TAB.LOGO}>
          <Text>
            {MEDIA_TAB.LOGO} ({images.logos.length})
          </Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={MEDIA_TAB.VIDEO}>
        <ScrollArea scrollbars="x" offsetScrollbars py="md">
          <Stack>
            {videos.results.map(video => (
              <VideoCard video={video} key={video.id} />
            ))}
          </Stack>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value={MEDIA_TAB.BACKDROP}>
        <ScrollArea scrollbars="x" offsetScrollbars py="md">
          <Stack>
            {images.backdrops.map(backdrop => (
              <Image
                src={getTmdbImage(
                  backdrop.file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background image'}
                key={backdrop.file_path}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value={MEDIA_TAB.POSTER}>
        <ScrollArea scrollbars="x" offsetScrollbars py="md">
          <Grid>
            {images.posters.map(poster => (
              <Grid.Col span={6} key={poster.file_path}>
                <Image
                  src={getTmdbImage(
                    poster.file_path,
                    ImageSize.ORIGINAL,
                  )}
                  alt={'Background image'}
                />
              </Grid.Col>
            ))}
          </Grid>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value={MEDIA_TAB.LOGO}>
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

export enum SelectKey {
  VIDEOS = 'videos',
  BACKDROPS = 'backdrops',
  POSTERS = 'posters',
  LOGOS = 'logos',
}

const OptionModeList = ({ videos, images }: MovieMediaProps) => {
  const [value, setValue] = useState<SelectKey>(SelectKey.VIDEOS);

  const results = useMemo(() => {
    switch (value) {
      case SelectKey.VIDEOS:
        return videos.results;
      case SelectKey.BACKDROPS:
        return images.backdrops;
      case SelectKey.POSTERS:
        return images.posters;
      case SelectKey.LOGOS:
        return images.logos;
    }
  }, [videos, images, value]);

  return (
    <Stack>
      <Select data={[
        { label: 'Videos', value: SelectKey.VIDEOS },
        { label: 'Backdrops', value: SelectKey.BACKDROPS },
        { label: 'Posters', value: SelectKey.POSTERS },
        { label: 'Logos', value: SelectKey.LOGOS },
      ]} value={value} onChange={val => setValue(val as SelectKey)} />
      <ScrollArea scrollbars="x" offsetScrollbars py="md">
        <Stack>
          {results.map((item: any) => {
            if (value === SelectKey.VIDEOS) {
              return <VideoCard video={item} key={item.id} />;
            }
            return (
              <Image
                src={getTmdbImage(
                  item.file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background image'}
                key={item.file_path}
              />
            );
          })}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

type MovieVideoProps = {
  videoKey: string;
}

export const MovieVideo = ({ videoKey }: MovieVideoProps) => {
  // useEffect(() => {
  //   (async () => {
  //     const response = await checkTrailerAvailability({ videoKey });
  //     console.log(response, ',<<ok');
  //   })();
  // }, [videoKey]);
  return (
    <Box
      component="iframe"
      src={`https://www.youtube.com/embed/${videoKey}`}
      allow="fullscreen; autoplay"
      style={{ width: '100%', height: 250, border: 0 }}
    ></Box>
  );
};

export const MovieMedia = ({ videos, images }: MovieMediaProps) => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [isMediaOpened, media] = useDisclosure(false);

  return (
    <Box>
      <Drawer
        opened={isMediaOpened}
        onClose={media.close}
        title="Media"
        size="xl"
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {isMobile
          ? <OptionModeList videos={videos} images={images} />
          : <TabModeList videos={videos} images={images} />
        }
      </Drawer>
      <Stack gap={0}>
        <Group justify="space-between">
          <Text size="xl" fw="bold">
            Media ({videos.results.length})
          </Text>
          {videos.results.length > 3 && (
            <Button variant="transparent" onClick={media.open}
                    className={classes.title} fw={500}>
              View More <IconArrowRight />
            </Button>
          )}
        </Group>
        <Text pb="md">Explore photos, videos, and other media related to the movie.</Text>
        <ScrollArea offsetScrollbars>
          <Group wrap="nowrap" gap="xs">
            <MovieVideo videoKey={videos.results[0].key} />
            {Boolean(images.backdrops.length) && (
              <Image
                src={getTmdbImage(
                  images.backdrops[0].file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background image'}
                height={250}
              />
            )}
            {Boolean(images.posters.length) && (
              <Image
                src={getTmdbImage(
                  images.posters[0].file_path,
                  ImageSize.ORIGINAL,
                )}
                alt={'Background image'}
                height={250}
              />
            )}
          </Group>
        </ScrollArea>
      </Stack>
    </Box>
  );
};