'use client';

import { Box, List } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { Chapter, ChapterCollection } from '@/features/manga/types/chapter.type';
import { fetchMangaChapterList } from '@/features/manga/manga.action';
import Link from 'next/link';
import { Manga } from '@/features/manga/manga.type';


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
}

export type ChapterFeed = {
  volume: number;
  list: Chapter[];
}

export const VolumeFeed = ({ manga }: VolumeFeedProps) => {
  const [volumes, setVolumes] = useState<ChapterCollection>(chaptersVolume);

  useEffect(() => {
    if (!manga) return;

    const loopTime = Number(manga.attributes.lastChapter) / 100;

    for (let i = 1; i <= loopTime; i++) {
      fetchMangaChapterList({
        page: i,
        pageSize: 100,
        mangaId: manga.id,
      }).then((data) => {
        setVolumes(prev => ({
          ...prev,
          data: prev.data.concat(data.data),
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const volumeList = useMemo(() => {
    return volumes.data.toSorted((a, b) => {
        if (isNaN(Number(a.attributes.volume)) > isNaN(Number(b.attributes.volume))) return 1;
        return Number(a.attributes.volume) - Number(b.attributes.volume);
      },
    )
      .reduce<ChapterFeed[]>((acc, chapter) => {
        const volume = Number(chapter.attributes.volume);
        const isVolumeExist = acc.find((v) => v.volume === volume);
        if (isVolumeExist) {
          isVolumeExist.list.push(chapter);
        } else {
          acc.push({
            volume,
            list: [chapter],
          });
        }
        return acc;
      }, []);
  }, [volumes]);

  const hasMoreVolume = volumes.data.length === 0 ? true : Number(manga.attributes.lastChapter) > volumes.data.length;

  return (
    <Box>
      <List listStyleType="disc">
        {volumeList.map(volume => (
          <List.Item key={volume.volume}>
            Volume {volume.volume}
            {volume.list.toSorted((a, b) => {
              if (isNaN(Number(a.attributes.chapter)) > isNaN(Number(b.attributes.chapter))) return 1;
              return Number(a.attributes.chapter) - Number(b.attributes.chapter);
            }).map(chapter => (
              <List listStyleType="disc" key={chapter.id}>
                <Box component={Link} style={{ textDecoration: 'none' }} href={`/read/${chapter.id}`}>
                  Chapter {chapter.attributes.chapter} {chapter.attributes.title}
                </Box>
              </List>
            ))}
          </List.Item>
        ))}
      </List>
    </Box>
  );
};
