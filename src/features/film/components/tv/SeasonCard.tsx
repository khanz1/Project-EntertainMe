import { Box, Card, Group, Image, Text } from '@mantine/core';
import classes from '../../styles/SeasonCard.module.css';
import { getTmdbImage } from '@/features/film/film.helper';
import { Season } from '@/features/film/types/series.type';

export type SeasonCardProps = {
  season: Season;
}

export const SeasonCard = ({ season }: SeasonCardProps) => {
  return (
    <Card w="100%" radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <Image
          className={classes.image}
          src={getTmdbImage(season.poster_path)}
          alt={season.name}
        />
        <Box px="md" w="100%" className={classes.cardBody}>
          <Group justify="space-between" wrap="nowrap">
            <Text className={classes.title} tt="uppercase" lineClamp={1} fw={700}>
              {season.name}
            </Text>
            <Text>{season.episode_count}E</Text>
          </Group>
          <Text mt="xs" mb="md" lineClamp={4}>
            {season.overview}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};