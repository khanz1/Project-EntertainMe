import { FILM_FILTERS } from '@/features/film/types/film.type';
import { Box, Group } from '@mantine/core';
import { fetchTVSeries } from '@/features/film/actions/tv.action';
import { FilmCard } from '@/features/film/components/FilmCard';
import { ItemType } from '@prisma/client';
import { Pagination } from '@/features/app/components/discover/Pagination';

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
    return (
      <Box>
        <Group align="center" justify="center" style={{ height: 'calc(70vh - 100px)' }}>
          <h1>No results found</h1>
        </Group>
      </Box>
    );
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
