import classes from './MovieCard.module.css';
import { Box, Card, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { getTmdbImage } from '../film.helper';
import { Movie } from '../types/movie.type';
import { fSlug } from '@/utils/slugify.helper';

export type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link style={{ textDecoration: 'none' }} href={`/movies/${fSlug(movie.title, movie.id)}`}>
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
            backgroundImage: `url(${getTmdbImage(movie.poster_path)})`,
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text className={classes.title} fw={500} lineClamp={1}>
              {movie.title}
            </Text>

            <Group gap="xs">
              <Text size="sm" className={classes.author}>
                {'Movie'}
              </Text>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="sm" className={classes.author}>
                {movie.vote_average?.toFixed(2)}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export const MovieCardMobile = ({ movie }: MovieCardProps) => {
  return (
    <Card component={Link} href={`/movies/${fSlug(movie.title, movie.id)}`} w="100%" radius="md" p={0}
          className={classes.cardMobile}>
      <Group wrap="nowrap" gap={0} className={classes.cardBodyMobile}>
        <Image
          className={classes.imageMobile}
          src={getTmdbImage(movie.poster_path)}
          alt={movie.title}
        />
        <Box px="md" pt="sm" w="100%">
          <Group justify="space-between" wrap="nowrap">
            <Text className={classes.titleMobile} tt="uppercase" lineClamp={1} fw={700}>
              {movie.title}
            </Text>
            <Text>{movie.vote_average.toFixed(2)}</Text>
          </Group>
          <Text mt="xs" mb="md" lineClamp={3}>
            {movie.overview}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};