import { Box, Group, Image } from '@mantine/core';
import { fetchReviews, fetchSeriesById } from '@/features/film/film.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { getTmdbImage } from '@/features/film/film.helper';
import { DetailTVSeries } from '@/features/film/components/DetailTvSeries';
import { parseIdFromSlug } from '@/utils/slugify.helper';
import { BackButton } from '@/features/app/BackButton';

export type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const movieId = parseIdFromSlug(params.slug);

  const [tvSeries, reviews] = await Promise.all([
    fetchSeriesById(movieId),
    fetchReviews(movieId, FILM_TYPE.TV_SERIES),
  ]);

  return (
    <Box>
      <BackButton />
      <Group wrap="nowrap" gap="xl">
        <Image
          src={getTmdbImage(tvSeries.poster_path)}
          h="100vh"
          alt={tvSeries.name}
        />
        <DetailTVSeries tvSeries={tvSeries} reviews={reviews} />
      </Group>
    </Box>
  );
}
