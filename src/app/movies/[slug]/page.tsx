import { Box } from '@mantine/core';
import { parseIdFromSlug } from '@/utils/slugify.helper';
import { BackButton } from '@/features/app/BackButton';
import { MovieReview } from '@/features/film/components/movies/MovieReview';
import { MovieDetailContainer } from '@/features/film/components/movies/MovieDetailContainer';

export type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const movieId = parseIdFromSlug(params.slug);

  return (
    <Box style={{ background: 'var(--mantine-color-dark-8)', minHeight: '100vh' }}>
      <BackButton />
      <MovieDetailContainer movieId={movieId}>
        <MovieReview movieId={movieId} />
      </MovieDetailContainer>
    </Box>
  );
}
