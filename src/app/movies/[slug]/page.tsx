import {
  BackgroundImage,
  Badge,
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Image,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { fSlug, parseIdFromSlug } from '@/utils/slugify.helper';
import classes from './page.module.css';
import { fMinutes, getTmdbImage } from '@/features/film/film.helper';
import React from 'react';
import { fetchMovieById } from '@/features/film/actions/movie.action';
import { StreamAlert, StreamMovie } from '@/features/film/components/movies/MovieStream';
import { Metadata } from 'next';
import { fUSD } from '@/utils/formatter.helper';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';
import { ItemType } from '@prisma/client';
import { Credit, FavoriteAction, KeywordBadge, Media, Recommendation, Review } from '@/features/film/components';
import { ImageSize } from '@/constant';
import { fetchDetailMoviePage } from '@/features/app/action';

export type PageProps = {
  params: {
    slug: string;
  };
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movieId = parseIdFromSlug(params.slug);
  const movie = await fetchMovieById(movieId);

  const posterImage = getTmdbImage(movie.poster_path, ImageSize.LARGE);
  const backdropImage = getTmdbImage(movie.backdrop_path, ImageSize.LARGE);
  const canonicalUrl = 'https://entertainme.khanz1.dev';

  return {
    title: `${movie.title} | Entertain Me`,
    description: movie.overview,
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.overview,
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
      title: movie.title,
      description: movie.overview,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Entertain Me',
      images: [
        {
          url: posterImage,
          secureUrl: posterImage,
          alt: `${movie.title} - Entertain Me`,
        },
        {
          url: backdropImage,
          secureUrl: backdropImage,
          alt: `${movie.title} - Entertain Me`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const movieId = parseIdFromSlug(params.slug);
  const { movie, recommendations, credit, reviews, videos, images, isStreamAvailable } = await fetchDetailMoviePage({
    movieId,
  });

  const movieMetaData = [
    {
      label: 'Status',
      value: movie.status,
    },
    {
      label: 'Original Languages',
      value: movie.original_language,
    },
    {
      label: 'Budget',
      value: fUSD(movie.budget),
    },
    {
      label: 'Revenue',
      value: fUSD(movie.revenue),
    },
    {
      label: 'Runtime',
      value: fMinutes(movie.runtime),
    },
    {
      label: 'Rating',
      value: movie.vote_average.toFixed(2),
    },
  ];

  return (
    <Box style={{ background: 'var(--mantine-color-dark-8)', minHeight: '100vh' }}>
      {/*<HomeButton />*/}
      <Box
        className={classes.overlay}
        style={{
          background: `linear-gradient(to bottom, transparent 0%, var(--mantine-color-dark-8) 70%, var(--mantine-color-dark-8) 100%),  url('${getTmdbImage(movie.backdrop_path, ImageSize.ORIGINAL)}') no-repeat center center/cover`,
        }}
      ></Box>
      <Box className={classes.container}>
        <Grid p={{ base: 'md', sm: 'xl' }} gutter="xl">
          <GridCol span={{ base: 12, lg: 3 }}>
            <Stack>
              <Box style={{ borderRadius: rem(1), overflow: 'hidden' }}>
                <Image
                  src={getTmdbImage(movie.poster_path)}
                  alt={movie.title}
                  radius="md"
                  w={{ base: 200, lg: '100%' }}
                  m={{ base: 'auto' }}
                />
              </Box>
              <Stack visibleFrom="lg">
                {movieMetaData.map(metaData => (
                  <Box key={metaData.label}>
                    <Text fw="bold">{metaData.label}</Text>
                    <Text size="sm">{metaData.value}</Text>
                  </Box>
                ))}
                <KeywordBadge movieOrTVId={movie.id} type={ItemType.movie} />
              </Stack>
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, lg: 9 }}>
            <Stack gap="sm">
              <Stack gap={0}>
                <StreamAlert isStreamAvailable={isStreamAvailable} />
                <Group gap={0}>
                  <Link className={classes.titleLink} href={movie.homepage} target="_blank">
                    <Title order={1} fw="bold">
                      {movie.title}
                      <sup>
                        <IconExternalLink size="1rem" stroke={1.5} />
                      </sup>
                    </Title>
                  </Link>
                  <Title order={2}>({new Date(movie.release_date).getFullYear()})</Title>
                </Group>
                <Text c="dimmed" fs="italic">
                  {movie.tagline}
                </Text>
              </Stack>
              <Box>
                <Group gap="xs">
                  {movie.genres.map(genre => (
                    <Badge radius="sm" key={genre.id}>
                      {genre.name}
                    </Badge>
                  ))}
                </Group>
              </Box>
              <Group gap="xs">
                <FavoriteAction item={movie} type={ItemType.movie} />
                <StreamMovie isStreamAvailable={isStreamAvailable} movie={movie} />
              </Group>
              <Box>
                <Text size="xl" fw="bold" pt="xs">
                  Overview
                </Text>
                <Text>{movie.overview}</Text>
              </Box>
              <Credit credit={credit} />
              <Media videos={videos} images={images} />
              <Review reviews={reviews} />
              {Boolean(movie.belongs_to_collection) && (
                <BackgroundImage
                  className={classes.collectionBackground}
                  src={getTmdbImage(movie.belongs_to_collection.backdrop_path, ImageSize.LARGE)}
                  radius="md"
                >
                  <Box p="xl" style={{ zIndex: 2, position: 'relative' }}>
                    <Stack gap="xl">
                      <Title order={2} fw="bold">
                        {movie.belongs_to_collection.name}
                      </Title>
                      <Link
                        href={`/collection/${fSlug(movie.belongs_to_collection.name, movie.belongs_to_collection.id)}`}
                      >
                        <Button variant="light">Browse Collection</Button>
                      </Link>
                    </Stack>
                  </Box>
                </BackgroundImage>
              )}
              <Recommendation recommendations={recommendations} />
            </Stack>
          </GridCol>
        </Grid>
      </Box>
    </Box>
  );
}
