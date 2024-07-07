import classes from './FilmCard.module.css';
import { Box, Card, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { getTmdbImage } from '../film.helper';
import { TVSeries } from '../types/series.type';
import { fSlug } from '@/utils/slugify.helper';

export type TVSeriesCardProps = {
  tvSeries: TVSeries;
};

export function TVSeriesCard({ tvSeries }: TVSeriesCardProps) {
  return (
    <Link style={{ textDecoration: 'none' }} href={`/tv/${fSlug(tvSeries.name, tvSeries.id)}`}>
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


export const TVSeriesCardMobile = ({ tvSeries }: TVSeriesCardProps) => {
  return (
    <Card
      component={Link}
      href={`/tv/${fSlug(tvSeries.name, tvSeries.id)}`}
      w="100%"
      radius="md"
      p={0}
      className={classes.cardMobile}
    >
      <Group wrap="nowrap" gap={0} className={classes.cardBodyMobile}>
        <Image
          className={classes.imageMobile}
          src={getTmdbImage(tvSeries.poster_path)}
          alt={tvSeries.name}
        />
        <Box px="md" pt="sm" w="100%">
          <Group justify="space-between" wrap="nowrap">
            <Text className={classes.titleMobile} tt="uppercase" lineClamp={1} fw={700}>
              {tvSeries.name}
            </Text>
            <Text>{tvSeries.vote_average.toFixed(2)}</Text>
          </Group>
          <Text mt="xs" mb="md" lineClamp={3}>
            {tvSeries.overview}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};