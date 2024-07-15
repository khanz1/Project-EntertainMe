import { FILM_FILTERS } from '@/features/film/types/film.type';
import { Box, Group } from '@mantine/core';
import { fetchTVSeries } from '@/features/film/actions/tv.action';
import { FilmCard } from '@/features/film/components/FilmCard';
import { ItemType } from '@prisma/client';
import { Pagination } from '@/features/app/components/discover/Pagination';
import { NotFoundItem } from '@/features/app/components/not-found/NotFoundItem';

type PageProps = {
  searchParams: {
    search: string;
    page: string;
    filter: string;
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

  const tvSeries = await fetchTVSeries({
    page,
    filter,
    search,
  });

  if (tvSeries.total_results === 0) {
    return <NotFoundItem />;
  }
  return (
    <Box>
      <Group gap="md" align="center">
        {tvSeries.results.map(film => (
          <FilmCard key={film.id} film={film} type={ItemType.tv} />
        ))}
      </Group>
      <Pagination totalPages={tvSeries.total_pages} />
    </Box>
  );
}
