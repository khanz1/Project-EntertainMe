import classes from './MovieCard.module.css';
import { Box, Card, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { getTmdbImage } from '../film.helper';
import { TVSeries } from '../types/series.type';

export type TVSeriesCardProps = {
  tvSeries: TVSeries;
};

export function TVSeriesCard({ tvSeries }: TVSeriesCardProps) {
  return (
    <Link style={{ textDecoration: 'none' }} href={`/tv/${tvSeries.id}`}>
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
            backgroundImage: `url(${getTmdbImage(tvSeries.poster_path)})`,
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text className={classes.title} fw={500} lineClamp={1}>
              {tvSeries.name}
            </Text>

            <Group gap="xs">
              <Text size="sm" className={classes.author}>
                {'TV'}
              </Text>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="sm" className={classes.author}>
                {tvSeries.vote_average?.toFixed(1)}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
