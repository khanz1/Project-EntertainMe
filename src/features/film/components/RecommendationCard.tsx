import classes from './Detail.module.css';
import { Box, Card, Text } from '@mantine/core';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import { APP } from '@/constant';
import { MovieRecommendation, TVRecommendation } from '@/features/film/types/recommendation.type';
import Link from 'next/link';
import { fSlug } from '@/utils/slugify.helper';

export type RecommendationCardProps = {
  recommendation: MovieRecommendation | TVRecommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const title = 'title' in recommendation ? recommendation.title : recommendation.name;
  const backgroundImage = recommendation.backdrop_path
    ? getTmdbImage(recommendation.backdrop_path, ImageSize.LARGE)
    : APP.NO_IMAGE;

  return (
    <Card
      component={Link}
      // TODO: in tvSeries the recommendation field is name not title, we should change later on
      href={`/${'title' in recommendation ? 'movies' : 'tv'}/${fSlug(title, recommendation.id)}`}
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
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Text className={classes.title} fw={500} lineClamp={1}>
          {title}
        </Text>
      </div>
    </Card>
  );
}
