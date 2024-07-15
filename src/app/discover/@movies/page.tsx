import { FILM_FILTERS } from '@/features/film/types/film.type';
import { Box, Group } from '@mantine/core';
import { fetchMovies } from '@/features/film/actions/movie.action';
import { FilmCard } from '@/features/film/components/FilmCard';
import { ItemType } from '@prisma/client';
import { Pagination } from '@/features/app/components/discover/Pagination';
import { NotFoundItem } from '@/features/app/components/not-found/NotFoundItem';

type PageProps = {
  searchParams: {
    search?: string;
    page?: string;
    filter?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const search = searchParams.search || '';
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const filter = searchParams.filter
    ? (searchParams.filter as FILM_FILTERS)
    : search
      ? FILM_FILTERS.NONE
      : FILM_FILTERS.POPULAR;

  const movies = await fetchMovies({
    page,
    filter,
    search,
  });

  if (movies.total_results === 0) {
    // NOTE: not using not-found.ts because it's a bug where page are not re-rendered
    // after the url search param is changed
    return <NotFoundItem />;
  }

  return (
    <Box>
      <Group gap="md" align="center">
        {movies.results.map(movie => (
          <FilmCard key={movie.id} film={movie} type={ItemType.movie} />
        ))}
      </Group>

      <Pagination totalPages={movies.total_pages} />
    </Box>
  );
}
