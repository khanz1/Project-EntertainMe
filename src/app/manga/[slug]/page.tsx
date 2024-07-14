import { Badge, Box, Grid, GridCol, Group, Image, rem, Stack, Text, Title } from '@mantine/core';
import { parseMangaIdFromSlug } from '@/utils/slugify.helper';
import { fetchMangaByMangaId, fetchMangaCover, fetchStatisticsByMangaId } from '@/features/manga/manga.action';
import { getMangaCover } from '@/features/manga/manga.helper';
import { Metadata } from 'next';
import classes from './page.module.css';
import React from 'react';
import { MangaFileSize } from '@/features/manga/manga.type';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';
import { VolumeFeed } from '@/features/manga/components/VolumeFeed';
import { FavoriteAction } from '@/features/film/components';
import { ItemType } from '@prisma/client';

export type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const mangaId = parseMangaIdFromSlug(params.slug);
  if (!mangaId) {
    return {};
  }
  const { data } = await fetchMangaByMangaId(mangaId);
  const coverId = data.relationships.find(r => r.type === 'cover_art')?.id;

  if (!coverId) {
    return {};
  }
  const { data: cover } = await fetchMangaCover(coverId);

  const coverUrl = getMangaCover({
    fileName: cover.attributes.fileName,
    mangaId: mangaId,
  });

  const canonicalUrl = 'https://entertainme.khanz1.dev';
  const title = data.attributes.title.en;
  const description = data.attributes.description.en;

  return {
    title: title,
    description,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverUrl],
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Entertain Me',
      images: [
        {
          url: coverUrl,
          secureUrl: coverUrl,
          alt: `${title} - Entertain Me`,
        },
        {
          url: coverUrl,
          secureUrl: coverUrl,
          alt: `${title} - Entertain Me`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const mangaId = parseMangaIdFromSlug(params.slug);
  if (!mangaId) {
    return null;
  }
  const [{ data: manga }, { statistics }] = await Promise.all([
    fetchMangaByMangaId(mangaId),
    fetchStatisticsByMangaId(mangaId),
  ]);

  const coverId = manga.relationships.find(r => r.type === 'cover_art')?.id;

  if (!manga || !coverId) {
    return null;
  }
  const { data: cover } = await fetchMangaCover(coverId);
  const coverUrl = getMangaCover(
    {
      fileName: cover.attributes.fileName,
      mangaId: mangaId,
    },
    MangaFileSize.ORIGINAL,
  );

  return (
    <Box style={{ background: 'var(--mantine-color-dark-8)', minHeight: '100vh' }}>
      {/*<HomeButton />*/}
      <Box
        className={classes.overlay}
        style={{
          background: `linear-gradient(to bottom, transparent 0%, var(--mantine-color-dark-8) 70%, var(--mantine-color-dark-8) 100%),  url('${coverUrl}') no-repeat center center/cover`,
        }}
      ></Box>
      <Box className={classes.container}>
        <Grid p={{ base: 'md', sm: 'xl' }} gutter="xl">
          <GridCol span={{ base: 12, lg: 3 }}>
            <Stack>
              <Box style={{ borderRadius: rem(1), overflow: 'hidden' }}>
                <Image
                  src={coverUrl}
                  alt={manga.attributes.title.en}
                  radius="md"
                  w={{ base: 200, lg: '100%' }}
                  m={{ base: 'auto' }}
                />
              </Box>
              <Stack visibleFrom="lg">{/*<KeywordBadge movieOrTVId={movie.id} type={ItemType.movie} />*/}</Stack>
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, lg: 9 }}>
            <Stack gap="sm">
              <Stack gap={0}>
                <Group gap={0}>
                  <Link className={classes.titleLink} href={'/'} target="_blank">
                    <Title order={1} fw="bold">
                      {manga.attributes.title.en}
                      <sup>
                        <IconExternalLink size="1rem" stroke={1.5} />
                      </sup>
                    </Title>
                  </Link>
                  <Title order={2}>({manga.attributes.year})</Title>
                </Group>
              </Stack>
              <Box>
                <Group gap="xs">
                  {manga.attributes.tags.map(tag => (
                    <Badge radius="sm" key={tag.id}>
                      {tag.attributes.name.en}
                    </Badge>
                  ))}
                </Group>
              </Box>
              <FavoriteAction type={ItemType.manga} item={manga} />
              <Box>
                <Text size="xl" fw="bold" pt="xs">
                  Overview
                </Text>
                <Text>{manga.attributes.description.en}</Text>
              </Box>
              <VolumeFeed manga={manga} />
            </Stack>
          </GridCol>
        </Grid>
      </Box>
    </Box>
  );
}
