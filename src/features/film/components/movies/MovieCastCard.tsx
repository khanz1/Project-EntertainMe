import classes from './MovieCastCard.module.css';
import { Box, Card, Group, Text } from '@mantine/core';
import { Cast } from '@/features/film/types/credits.type';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import { APP } from '@/constant';

export type MovieCastCardProps = {
  cast: Cast;
};

export function MovieCastCard({ cast }: MovieCastCardProps) {
  return (
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
          backgroundImage: cast.profile_path ? `url(${getTmdbImage(cast.profile_path, ImageSize.SMALL)})` : APP.NO_IMAGE,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="xs" className={classes.title} fw={500} lineClamp={1}>
            {cast.name}
          </Text>

          <Group justify="space-between" gap="xs">
            {/*<Text size="sm" className={classes.author}>*/}
            {/*  {cast.gender === 1 ? 'Actress' : 'Actor'}*/}
            {/*</Text>*/}
            {/*<Text size="xs" c="dimmed">*/}
            {/*  •*/}
            {/*</Text>*/}
            <Text size="xs" className={classes.author}>
              as {cast.character}
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}
