import classes from './MangaCard.module.css';
import { Box, Card, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { fSlug } from '@/utils/slugify.helper';
import { CoverCollection, Manga, MangaFileSize } from '@/features/manga/manga.type';
import { useEffect, useState } from 'react';
import { fetchMangaCover } from '@/features/manga/manga.action';
import { getMangaCover, getMangaTitle } from '@/features/manga/manga.helper';

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
    const coverId = manga.relationships.find((r) => r.type === 'cover_art')?.id;

    if (coverId) {
      fetchMangaCover(coverId).then(setCover);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Link style={{ textDecoration: 'none' }}
          href={`/manga/${fSlug(getMangaTitle(manga), manga.id)}`}>
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        w={200}
        h={300}
      >
        <Box
          className={classes.image}
          style={{
            backgroundImage: `url(${getMangaCover({
              fileName: cover.data.attributes.fileName,
              mangaId: manga.id,
            }, MangaFileSize.LOW)})`,
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text className={classes.title} fw={500} lineClamp={1}>
              {getMangaTitle(manga)}
            </Text>

            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.author}>
                {manga.attributes.status}
              </Text>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="sm" className={classes.author}>
                {manga.attributes.year}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
