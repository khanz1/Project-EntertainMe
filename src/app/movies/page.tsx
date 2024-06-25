'use client';

import { MovieCard } from '@/features/film/components/MovieCard';
import { FILM_FILTERS, ResData } from '@/features/film/types/film.type';
import { fCapitalizeSpace, fThousandsNumber } from '@/utils/formatter.helper';
import { Center, Container, Grid, Group, Loader, Select, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Movie } from '@/features/film/types/movie.type';
import { fetchMovies } from '@/features/film/actions/movie.action';

const filterList = [
  FILM_FILTERS.NONE,
  FILM_FILTERS.POPULAR,
  FILM_FILTERS.TOP_RATED,
  FILM_FILTERS.UPCOMING,
  FILM_FILTERS.NOW_PLAYING,
].map((f) => ({
  label: f === FILM_FILTERS.NONE ? 'Select Filter' : fCapitalizeSpace(f),
  value: f,
}));
const filmState: ResData<Movie[]> = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1,
};

type PageProps = {
  searchParams: {
    search: string;
    page: string;
    filter: string;
  }
}

const DEBOUNCE_TIME = 500;

export default function Page({ searchParams }: PageProps) {
  const router = useRouter();
  const [movies, setMovies] = useState<ResData<Movie[]>>(filmState);

  const search = searchParams.search || '';
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const filter = searchParams.filter ? searchParams.filter as FILM_FILTERS : search ? FILM_FILTERS.NONE : FILM_FILTERS.POPULAR;
  const [debounced] = useDebouncedValue(search, DEBOUNCE_TIME);

  useEffect(() => {
    (async () => {
      const data = await fetchMovies({
        page,
        filter,
        search: debounced,
      });

      if (page === 1) {
        setMovies(data);
      } else {
        setMovies((prev) => ({
          ...prev,
          results: prev.results.concat(data.results),
        }));
      }
    })();
  }, [page, filter, debounced]);

  const fetchNextMovies = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', (page + 1).toString());
    router.push(url.toString(), {
      scroll: false,
    });
  };

  const handleOnFilterChange = (val: string | null) => {
    if (val) {
      const url = new URL(window.location.href);
      url.searchParams.set('filter', val);
      url.searchParams.set('page', '1');
      url.searchParams.delete('search');
      router.push(url.toString());
    }
  };

  const hasMoreMovies =
    movies.results.length === 0
      ? true
      : movies.results.length < movies.total_results;

  return (
    <Container size="xl" my={25}>
      <Grid>
        <Grid.Col>
          <Group justify="space-between" mb="md" mx="md">
            <Select
              placeholder="Pick value"
              data={filterList}
              value={filter}
              onChange={handleOnFilterChange}
            />
            <Text>
              Showing {fThousandsNumber(movies.results.length)} from{' '}
              {fThousandsNumber(movies.total_results)} film
            </Text>
          </Group>
          <InfiniteScroll
            dataLength={movies.results.length}
            next={fetchNextMovies}
            hasMore={hasMoreMovies}
            loader={
              <Center my="xl">
                <Loader color="blue" />
              </Center>
            }
          >
            <Group
              gap="md"
              align="center"
            >
              {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Group>
          </InfiniteScroll>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
