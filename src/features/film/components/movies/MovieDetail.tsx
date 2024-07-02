'use client';
import {
  Avatar,
  BackgroundImage,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Image,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { fMinutes, getTmdbImage } from '@/features/film/film.helper';
import React from 'react';
import { type MovieDetail as TMovieDetail } from '@/features/film/types/movie.type';
import Link from 'next/link';
import { fUSD } from '@/utils/formatter.helper';
import { IconExternalLink, IconHeart } from '@tabler/icons-react';
import classes from './MovieDetail.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_BREAKPOINT } from '@/constant';
import { fSlug } from '@/utils/slugify.helper';

export type MovieDetailProps = {
  movie: TMovieDetail;
  ReviewWrapper: React.ReactNode;
  KeywordBadge: React.ReactNode;
  CreditWrapper: React.ReactNode;
  MediaWrapper: React.ReactNode;
  RecommendationWrapper: React.ReactNode;
  StreamAlert: React.ReactNode;
  StreamMovie: React.ReactNode;
  isStreamAvailable: boolean;
};

export enum MEDIA_TAB {
  VIDEO = 'Videos',
  BACKDROP = 'Backdrops',
  POSTER = 'Posters',
  LOGO = 'Logos',
}

export enum CAST_TAB {
  CAST = 'Cast',
  CREW = 'Crew',
}

export const MovieDetail = ({
                              movie,
                              ReviewWrapper,
                              KeywordBadge,
                              CreditWrapper,
                              MediaWrapper,
                              RecommendationWrapper,
                              StreamAlert,
                              StreamMovie,
                            }: MovieDetailProps) => {

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

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
    <Grid p={isMobile ? 'md' : 'xl'} gutter="xl">
      <Grid.Col span={{ base: 12, lg: 3 }}>
        <Stack>
          <Box style={{ borderRadius: rem(1), overflow: 'hidden' }}>
            <Image src={getTmdbImage(movie.poster_path)} alt={movie.title}
                   radius="md"
                   style={isMobile ? { width: 200, margin: 'auto' } : {}} />
          </Box>
          <Stack visibleFrom="lg">
            {movieMetaData.map(metaData => (
              <Box key={metaData.label}>
                <Text fw="bold">{metaData.label}</Text>
                <Text size="sm">{metaData.value}</Text>
              </Box>
            ))}
            {KeywordBadge}
          </Stack>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 9 }}>
        <Stack gap="sm">
          <Stack gap={0}>
            {StreamAlert}
            <Group gap={0}>
              <Link
                className={classes.titleLink}
                href={movie.homepage}
                target="_blank"
              >
                <Title order={1} fw="bold">
                  {movie.title}
                  <sup>
                    <IconExternalLink size="1rem" stroke={1.5} />
                  </sup>
                </Title>
              </Link>
              <Title order={2}>
                ({new Date(movie.release_date).getFullYear()})
              </Title>
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
            <Avatar color="blue">
              <IconHeart size="1.5rem" className={classes.actionButton} />
            </Avatar>
            {StreamMovie}
          </Group>
          <Box>
            <Text size="xl" fw="bold" pt="xs">
              Overview
            </Text>
            <Text>{movie.overview}</Text>
          </Box>
          {/*<Group py="lg" justify="space-between">*/}
          {/*  {credit.crew*/}
          {/*    .filter((_, i) => i < 4)*/}
          {/*    .map(crew => (*/}
          {/*      <Box key={crew.credit_id}>*/}
          {/*        <Text ta="center">{crew.name}</Text>*/}
          {/*        <Text ta="center" fw="bold">*/}
          {/*          {crew.job}*/}
          {/*        </Text>*/}
          {/*      </Box>*/}
          {/*    ))}*/}
          {/*</Group>*/}
          {CreditWrapper}
          {MediaWrapper}
          {ReviewWrapper}
          {Boolean(movie.belongs_to_collection) && (
            <BackgroundImage
              className={classes.collectionBackground}
              src={getTmdbImage(movie.belongs_to_collection.backdrop_path)} radius="md">
              <Box p="xl" style={{ zIndex: 2, position: 'relative' }}>
                <Stack gap="xl">
                  <Title order={2} fw="bold">{movie.belongs_to_collection.name}</Title>
                  <Link href={`/collection/${fSlug(movie.belongs_to_collection.name, movie.belongs_to_collection.id)}`}>
                    <Button variant="light">Browse Collection</Button>
                  </Link>
                </Stack>
              </Box>
            </BackgroundImage>
          )}
          {RecommendationWrapper}
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
