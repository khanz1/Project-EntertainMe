import Link from 'next/link';
import { ActionIcon, Box, Group, Image } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { fetchReviews, fetchSeriesById } from '@/features/film/film.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { getTmdbImage } from '@/features/film/film.helper';
import { DetailTVSeries } from '@/features/film/components/DetailTvSeries';
import { parseIdFromSlug } from '@/utils/slugify.helper';

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
      <Link href="/">
        <ActionIcon
          style={{ position: 'absolute', top: '1%', left: '1%' }}
          variant="subtle"
          color="white"
          size="xl"
          radius="xs"
          aria-label="Button Back"
        >
          <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Link>
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
