'use client';

import {
  Accordion,
  Box,
  Button,
  Drawer,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ChapterCollection,
  ChapterFeed,
} from '@/features/manga/types/chapter.type';
import { fetchMangaChapterList } from '@/features/manga/manga.action';
import { Manga } from '@/features/manga/manga.type';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import classes from '@/features/manga/styles/Detail.module.css';
import { ChapterCard } from '@/features/manga/components/ChapterCard';

export const chaptersVolume: ChapterCollection = {
  result: '',
  response: '',
  data: [],
  limit: 0,
  offset: 0,
  total: 0,
};

export type VolumeFeedProps = {
  manga: Manga;
};

export const VolumeFeed = ({ manga }: VolumeFeedProps) => {
  const [isDrawerOpen, drawer] = useDisclosure(false);
  const [volumeNumber, setVolumeNumber] = useState(1);
  const [volumes, setVolumes] = useState<ChapterCollection>(chaptersVolume);

  useEffect(() => {
    if (!manga) return;

    const loopTime = Number(manga.attributes.lastChapter) / 100;

    for (let i = 1; i <= loopTime; i++) {
      fetchMangaChapterList({
        page: i,
        pageSize: 100,
        mangaId: manga.id,
      }).then(data => {
        setVolumes(prev => ({
          ...prev,
          data: prev.data.concat(data.data),
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const volumeList = useMemo(() => {
    return volumes.data
      .toSorted((a, b) => {
        if (
          isNaN(Number(a.attributes.volume)) >
          isNaN(Number(b.attributes.volume))
        )
          return 1;
        return Number(a.attributes.volume) - Number(b.attributes.volume);
      })
      .reduce<ChapterFeed[]>((acc, chapter) => {
        const volume = Number(chapter.attributes.volume);
        const isVolumeExist = acc.find(v => v.volume === volume);
        if (isVolumeExist) {
          isVolumeExist.chapters.push(chapter);
        } else {
          acc.push({
            volume,
            chapters: [chapter],
          });
        }
        return acc;
      }, []);
  }, [volumes]);

  const hasMoreVolume =
    volumes.data.length === 0
      ? true
      : Number(manga.attributes.lastChapter) > volumes.data.length;

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
              {/*<NativeSelect*/}
              {/*  value={String(volumeNumber)}*/}
              {/*  data={volumeList.map(volume => ({*/}
              {/*    label: volume.volume.toString(),*/}
              {/*    value: volume.volume.toString(),*/}
              {/*  }))}*/}
              {/*  onChange={event => {*/}
              {/*    setVolumeNumber(Number(event.target.value));*/}
              {/*  }}*/}
              {/*/>*/}
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <Accordion variant="filled" radius="md" defaultValue="Apples">
              {volumeList.map(({ volume, chapters }) => (
                <Accordion.Item key={volume} value={volume.toString()}>
                  <Accordion.Control>
                    Volume {volume} - (
                    {
                      chapters.filter(chapter => !!chapter.attributes.pages)
                        ?.length
                    }
                    )
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Group mt="xl" justify="center" wrap="wrap" gap="sm">
                      {chapters
                        .toSorted((a, b) => {
                          const c1 = Number(a.attributes.chapter);
                          const c2 = Number(b.attributes.chapter);
                          if (isNaN(c1) > isNaN(c2)) return 1;
                          return c1 - c2;
                        })
                        .map(chapter => (
                          <ChapterCard chapter={chapter} key={chapter.id} />
                        ))}
                    </Group>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
            {/*<List listStyleType="disc">*/}
            {/*  {volumeList.map(volume => (*/}
            {/*    <List.Item key={volume.volume}>*/}
            {/*      Volume {volume.volume}*/}
            {/*      {volume.chapters*/}
            {/*        .toSorted((a, b) => {*/}
            {/*          if (*/}
            {/*            isNaN(Number(a.attributes.chapter)) >*/}
            {/*            isNaN(Number(b.attributes.chapter))*/}
            {/*          )*/}
            {/*            return 1;*/}
            {/*          return (*/}
            {/*            Number(a.attributes.chapter) -*/}
            {/*            Number(b.attributes.chapter)*/}
            {/*          );*/}
            {/*        })*/}
            {/*        .map(chapter => (*/}
            {/*          <List listStyleType="disc" key={chapter.id}>*/}
            {/*            <Box*/}
            {/*              component={Link}*/}
            {/*              style={{ textDecoration: 'none' }}*/}
            {/*              href={`/read/${chapter.id}`}*/}
            {/*            >*/}
            {/*              Chapter {chapter.attributes.chapter}{' '}*/}
            {/*              {chapter.attributes.title}*/}
            {/*            </Box>*/}
            {/*          </List>*/}
            {/*        ))}*/}
            {/*    </List.Item>*/}
            {/*  ))}*/}
            {/*</List>*/}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Box mt="lg">
        <Group justify="space-between">
          <Text size="xl" fw="bold">
            Volume ({volumeList.length})
          </Text>
          <Button
            variant="transparent"
            onClick={drawer.open}
            className={classes.title}
            fw={500}
          >
            View More <IconArrowRight />
          </Button>
        </Group>
        <Text pb="md">Explore the different seasons of the series.</Text>
        <Stack>
          {/*{tvSeries.seasons*/}
          {/*  .filter(season => {*/}
          {/*    return season.episode_count !== 0 && season.name !== 'Specials';*/}
          {/*  })*/}
          {/*  .slice(0, 3)*/}
          {/*  .map(season => {*/}
          {/*    return <SeasonCard season={season} key={season.id} />;*/}
          {/*  })}*/}
        </Stack>
      </Box>
    </Box>
  );
};
