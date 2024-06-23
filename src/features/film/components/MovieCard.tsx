import classes from './MovieCard.module.css';
import { Box, Card, Group, Text } from '@mantine/core';
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

            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.author}>
                {'Movie'}
              </Text>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="sm" className={classes.author}>
                {movie.vote_average?.toFixed(1)}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
