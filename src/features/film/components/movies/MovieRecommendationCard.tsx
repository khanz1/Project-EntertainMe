import classes from './MovieCastCard.module.css';
import { Box, Card, Text } from '@mantine/core';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import { APP } from '@/constant';
import { MovieRecommendation } from '@/features/film/types/recommendation.type';
import Link from 'next/link';
import { fSlug } from '@/utils/slugify.helper';

export type MovieRecommendationCardProps = {
  recommendation: MovieRecommendation;
};

export function MovieRecommendationCard({ recommendation }: MovieRecommendationCardProps) {
  return (
    <Card
      component={Link}
      href={`/movies/${fSlug(recommendation.title, recommendation.id)}`}
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      w={300}
      h={150}
    >
      <Box
        className={classes.image}
        style={{
          backgroundImage: recommendation.backdrop_path ? `url(${getTmdbImage(recommendation.backdrop_path, ImageSize.LARGE)})` : APP.NO_IMAGE,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text className={classes.title} fw={500} lineClamp={1}>
            {recommendation.title}
          </Text>

          {/*<Group justify="space-between" gap="xs">*/}
          {/*<Text size="sm" className={classes.author}>*/}
          {/*  {cast.gender === 1 ? 'Actress' : 'Actor'}*/}
          {/*</Text>*/}
          {/*<Text size="xs" c="dimmed">*/}
          {/*  •*/}
          {/*</Text>*/}
          {/*<Text size="xs" className={classes.author}>*/}
          {/*  as {recommendation.character}*/}
          {/*</Text>*/}
          {/*</Group>*/}
        </div>
      </div>
    </Card>
  );
}
