'use client';

import { Box, Breadcrumbs, Button, Drawer, Group, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { ChapterCollection } from '@/features/manga/types/chapter.type';
import { fetchAggregateByMangaId, fetchMangaChapterList } from '@/features/manga/manga.action';
import { Manga } from '@/features/manga/manga.type';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight, IconHome } from '@tabler/icons-react';
import classes from '@/features/manga/styles/Detail.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChapterCard } from '@/features/manga/components/ChapterCard';
import { MangaAggregate } from '@/features/manga/types/aggregate.type';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [volumes, setVolumes] = useState<ChapterCollection>(chaptersVolume);
  const [aggregate, setAggregate] = useState<MangaAggregate>({
    result: '',
    volumes: {},
  });

  const volume = searchParams.get('volume');

  useEffect(() => {
    if (!manga) return;
    fetchAggregateByMangaId(manga.id).then(setAggregate);
    if (volume) {
      if (!isDrawerOpen) {
        drawer.open();
      }
      setVolumes(chaptersVolume);
      fetchMangaChapterList({
        mangaId: manga.id,
        volume: Number(volume),
      }).then(setVolumes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  console.log(volumes, '<<< v');

  return (
    <Box>
      <Drawer.Root
        opened={isDrawerOpen}
        onClose={() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('volume');
          router.push(url.toString(), {
            scroll: false,
          });
          drawer.close();
        }}
        size="md"
        position="right"
      >
        <Drawer.Overlay backgroundOpacity={0.5} blur={4} />

        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title component={Group}>
              <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
                <Text
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.delete('volume');
                    router.push(url.toString(), {
                      scroll: false,
                    });
                  }}
                  className={classes.title}
                  tt="uppercase"
                  lineClamp={1}
                  fw={700}
                >
                  <IconHome size={25} />
                </Text>
                {Boolean(volume) && (
                  <Text className={classes.title} tt="uppercase" lineClamp={1} fw={700}>
                    Volume {volume}
                  </Text>
                )}
              </Breadcrumbs>
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            {Boolean(volume) ? (
              <Group mt="xl" justify="center" wrap="wrap" gap="sm">
                {volumes.data.map(chapter => (
                  <ChapterCard chapter={chapter} key={chapter.id} />
                ))}
              </Group>
            ) : (
              <Box>
                {Object.keys(aggregate.volumes).map(volumeNumber => {
                  return (
                    <>
                      <Text
                        onClick={() => {
                          const url = new URL(window.location.href);
                          url.searchParams.set('volume', volumeNumber);
                          router.push(url.toString(), {
                            scroll: false,
                          });
                        }}
                        key={volumeNumber}
                        className={classes.title}
                        py="md"
                        tt="uppercase"
                        lineClamp={1}
                        fw={700}
                      >
                        Volume {volumeNumber}
                      </Text>
                    </>
                  );
                })}
              </Box>
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Box mt="lg">
        <Group justify="space-between">
          <Text size="xl" fw="bold">
            Volume
          </Text>
          <Button variant="transparent" onClick={drawer.open} className={classes.title} fw={500}>
            View More <IconArrowRight />
          </Button>
        </Group>
        <Text pb="md">Explore the different seasons of the series.</Text>
        <Stack></Stack>
      </Box>
    </Box>
  );
};
