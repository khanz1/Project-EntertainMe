'use client';
import classes from '@/features/film/styles/FilmCard.module.css';
import { Box, Card, Grid, GridCol, Group, Image, Skeleton, Text } from '@mantine/core';
import Link from 'next/link';
import { getTmdbImage } from '../film.helper';
import { Movie } from '../types/movie.type';
import { TVSeries } from '../types/series.type';
import { fSlug } from '@/utils/slugify.helper';
import { ItemType } from '@prisma/client';

export type FilmCardProps =
  | {
      film: Movie;
      type: typeof ItemType.movie;
    }
  | {
      film: TVSeries;
      type: typeof ItemType.tv;
    };

export function FilmCard({ film, type }: FilmCardProps) {
  const title = type === ItemType.movie ? film.title : film.name;
  const link = type === ItemType.movie ? `/movies/${fSlug(title, film.id)}` : `/tv/${fSlug(title, film.id)}`;
  const voteAverage = film.vote_average?.toFixed(2);

  return (
    <>
      <Box component={Link} href={link} td="none" visibleFrom="sm">
        <Card p="lg" shadow="lg" className={classes.card} radius="md" w={200} h={300}>
          <Box
            className={classes.image}
            style={{
              backgroundImage: `url(${getTmdbImage(film.poster_path)})`,
            }}
          />
          <div className={classes.overlay} />
          <div className={classes.content}>
            <div>
              <Text className={classes.title} fw={500} lineClamp={1}>
                {title}
              </Text>

              <Group gap="xs">
                <Text size="sm" className={classes.author}>
                  {type === 'movie' ? 'Movie' : 'TV'}
                </Text>
                <Text size="xs" c="dimmed">
                  •
                </Text>
                <Text size="sm" className={classes.author}>
                  {voteAverage}
                </Text>
              </Group>
            </div>
          </div>
        </Card>
      </Box>

      <Card component={Link} href={link} hiddenFrom="sm" w="100%" radius="md" p={0} className={classes.cardMobile}>
        <Group wrap="nowrap" gap={0} className={classes.cardBodyMobile}>
          {film.poster_path ? (
            <Image className={classes.imageMobile} src={getTmdbImage(film.poster_path)} alt={title} />
          ) : (
            <Skeleton style={{ position: 'absolute', top: 0, left: 0 }} width="100%" height="100%" />
          )}

          <Box px="md" pt="sm" w="100%">
            <Grid>
              <GridCol span={10}>
                <Text className={classes.titleMobile} lineClamp={1} tt="uppercase" fw={700}>
                  {title}
                </Text>
              </GridCol>
              <GridCol span={2}>
                <Text>{voteAverage}</Text>
              </GridCol>
            </Grid>
            <Text mt="xs" mb="md" lineClamp={3}>
              {film.overview}
            </Text>
          </Box>
        </Group>
      </Card>
    </>
  );
}
