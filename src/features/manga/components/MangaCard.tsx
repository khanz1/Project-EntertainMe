'use client';
import classes from './MangaCard.module.css';
import { Box, Card, Group, Skeleton, Text } from '@mantine/core';
import Link from 'next/link';
import { fSlug } from '@/utils/slugify.helper';
import { CoverCollection, Manga, MangaFileSize } from '@/features/manga/manga.type';
import { useEffect, useState } from 'react';
import { getMangaCover, getMangaTitle } from '@/features/manga/manga.helper';
import { fetchMangaCover } from '@/features/manga/manga.action';

export type MovieCardProps = {
  manga: Manga;
};

export function MangaCard({ manga }: MovieCardProps) {
  const [cover, setCover] = useState<CoverCollection>({
    result: '',
    response: '',
    data: {
      id: '',
      type: '',
      attributes: {
        description: '',
        volume: '',
        fileName: '',
        locale: '',
        createdAt: '',
        updatedAt: '',
        version: 0,
      },
      relationships: [{ id: '', type: '' }],
    },
  });

  useEffect(() => {
    (async () => {
      const coverId = manga.relationships.find(r => r.type === 'cover_art')?.id;

      if (coverId) {
        fetchMangaCover(coverId).then(setCover);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Link style={{ textDecoration: 'none' }} href={`/manga/${fSlug(getMangaTitle(manga), manga.id)}`}>
      <Card p="lg" shadow="lg" className={classes.card} radius="md" w={200} h={300}>
        {cover.data.attributes.fileName ? (
          <Box
            className={classes.image}
            style={{
              backgroundImage: `url(${getMangaCover(
                {
                  fileName: cover.data.attributes.fileName,
                  mangaId: manga.id,
                },
                MangaFileSize.LOW,
              )})`,
            }}
          />
        ) : (
          <Skeleton style={{ position: 'absolute', top: 0, left: 0 }} width="100%" height="100%" />
        )}
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text className={classes.title} fw={500} lineClamp={1}>
              {getMangaTitle(manga)}
            </Text>

            <Group gap="xs">
              <Text size="sm" className={classes.author}>
                {manga.attributes.status}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
