import { Badge, Box, Grid, GridCol, Group, Image, rem, Stack, Text, Title } from '@mantine/core';
import { parseIdFromSlug } from '@/utils/slugify.helper';
import { BackButton } from '@/features/app/BackButton';
import classes from './page.module.css';
import { getTmdbImage } from '@/features/film/film.helper';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';
import { fetchTVSeriesById } from '@/features/film/actions/tv.action';
import { ItemType } from '@prisma/client';
import { TVSeason } from '@/features/film/components/tv/TVSeason';
import {
  fetchFilmCredits,
  fetchFilmImages,
  fetchFilmVideos,
  fetchRecommendations,
  fetchReviews,
} from '@/features/film/actions/film.action';
import { Credit, FavoriteAction, KeywordBadge, Media, Recommendation, Review } from '@/features/film/components';
import { ImageSize } from '@/constant';

export type PageProps = {
  params: {
    slug: string;
  };
};

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const tvSeriesId = parseIdFromSlug(params.slug);
  const tvSeries = await fetchTVSeriesById(tvSeriesId);

  const posterImage = getTmdbImage(tvSeries.poster_path, ImageSize.LARGE);
  const backdropImage = getTmdbImage(tvSeries.backdrop_path, ImageSize.LARGE);
  const canonicalUrl = 'https://entertainme.khanz1.dev';

  return {
    title: `${tvSeries.name} | Entertain Me`,
    description: tvSeries.overview,
    twitter: {
      card: 'summary_large_image',
      title: tvSeries.name,
      description: tvSeries.overview,
      images: [posterImage, backdropImage],
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
      title: tvSeries.name,
      description: tvSeries.overview,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Entertain Me',
      images: [
        {
          url: posterImage,
          secureUrl: posterImage,
          alt: `${tvSeries.name} - Entertain Me`,
        },
        {
          url: backdropImage,
          secureUrl: backdropImage,
          alt: `${tvSeries.name} - Entertain Me`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const tvSeriesId = parseIdFromSlug(params.slug);
  const [tvSeries, recommendations, credit, reviews, videos, images] = await Promise.all([
    fetchTVSeriesById(tvSeriesId),
    fetchRecommendations(ItemType.tv, tvSeriesId),
    fetchFilmCredits(ItemType.tv, tvSeriesId),
    fetchReviews(ItemType.tv, tvSeriesId),
    fetchFilmVideos(ItemType.tv, tvSeriesId),
    fetchFilmImages(ItemType.tv, tvSeriesId),
  ]);

  const tvSeriesMetaData = [
    {
      label: 'Status',
      value: tvSeries.status,
    },
    {
      label: 'Original Languages',
      value: tvSeries.original_language,
    },
    {
      label: 'Rating',
      value: tvSeries.vote_average?.toFixed(2),
    },
  ];

  return (
    <Box style={{ background: 'var(--mantine-color-dark-8)', minHeight: '100vh' }}>
      <BackButton />
      <Box
        className={classes.overlay}
        style={{ background: `linear-gradient(to bottom, transparent 0%, var(--mantine-color-dark-8) 70%, var(--mantine-color-dark-8) 100%),  url('${getTmdbImage(tvSeries.backdrop_path, ImageSize.ORIGINAL)}') no-repeat center center/cover` }}
      ></Box>
      <Box className={classes.container}>
        <Grid p={{ base: 'md', sm: 'xl' }} gutter="xl">
          <GridCol span={{ base: 12, lg: 3 }}>
            <Stack>
              <Box style={{ borderRadius: rem(1), overflow: 'hidden' }}>
                <Image
                  src={getTmdbImage(tvSeries.poster_path)} alt={tvSeries.name}
                  radius="md"
                  w={{ base: 200, lg: '100%' }}
                  m={{ base: 'auto' }}
                />
              </Box>
              <Stack visibleFrom="lg">
                {tvSeriesMetaData.map(metaData => (
                  <Box key={metaData.label}>
                    <Text fw="bold">{metaData.label}</Text>
                    <Text size="sm">{metaData.value}</Text>
                  </Box>
                ))}
                <KeywordBadge movieOrTVId={tvSeriesId} type={ItemType.tv} />
              </Stack>
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, lg: 9 }}>
            <Stack gap="sm">
              <Stack gap={0}>
                <Group gap={0}>
                  <Link
                    className={classes.titleLink}
                    href={tvSeries.homepage}
                    target="_blank"
                  >
                    <Title order={1} fw="bold">
                      {tvSeries.name}
                      <sup>
                        <IconExternalLink size="1rem" stroke={1.5} />
                      </sup>
                    </Title>
                  </Link>
                </Group>
                <Text c="dimmed" fs="italic">
                  {tvSeries.tagline}
                </Text>
              </Stack>
              <Box>
                <Group gap="xs">
                  {tvSeries.genres.map(genre => (
                    <Badge radius="sm" key={genre.id}>
                      {genre.name}
                    </Badge>
                  ))}
                </Group>
              </Box>
              <Group gap="xs">
                <FavoriteAction item={tvSeries} type={ItemType.tv} />
              </Group>
              <Box>
                <Text size="xl" fw="bold" pt="xs">
                  Overview
                </Text>
                <Text>{tvSeries.overview}</Text>
              </Box>

              <TVSeason tvSeries={tvSeries} />
              <Credit credit={credit} />
              <Media videos={videos} images={images} />
              <Review reviews={reviews} />
              {/*{Boolean(movie.belongs_to_collection) && (*/}
              {/*  <BackgroundImage*/}
              {/*    className={classes.collectionBackground}*/}
              {/*    src={getTmdbImage(movie.belongs_to_collection.backdrop_path, ImageSize.LARGE)} radius="md">*/}
              {/*    <Box p="xl" style={{ zIndex: 2, position: 'relative' }}>*/}
              {/*      <Stack gap="xl">*/}
              {/*        <Title order={2} fw="bold">{movie.belongs_to_collection.name}</Title>*/}
              {/*        <Link*/}
              {/*          href={`/collection/${fSlug(movie.belongs_to_collection.name, movie.belongs_to_collection.id)}`}>*/}
              {/*          <Button variant="light">Browse Collection</Button>*/}
              {/*        </Link>*/}
              {/*      </Stack>*/}
              {/*    </Box>*/}
              {/*  </BackgroundImage>*/}
              {/*)}*/}
              <Recommendation recommendations={recommendations} />
            </Stack>
          </GridCol>
        </Grid>
      </Box>
    </Box>
  );
}
