'use client';

import { Center, Grid, Group, Loader, Select, Text } from '@mantine/core';
import { MovieCard } from '@/features/film/components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FILM_FILTERS, ResData } from '@/features/film/types/film.type';
import { Movie } from '@/features/film/types/movie.type';
import { useRouter } from 'next/navigation';
import { fCapitalizeSpace, fThousandsNumber } from '@/utils/formatter.helper';
import { useMemo, useRef } from 'react';

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

export type MovieListProps = {
  movies: ResData<Movie[]>
  page: number;
  hasMoreMovies: boolean;
  filter: string;
}

export const MovieList = ({ movies: data, hasMoreMovies, page, filter }: MovieListProps) => {
  const movieRef = useRef<ResData<Movie[]>>({ ...data });
  const router = useRouter();

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

  const movies = useMemo(() => {
    if (page > 1) {
      movieRef.current.results = movieRef.current.results.concat(data.results);
      movieRef.current.page = data.page;
    }

    return movieRef.current;
  }, [data]);

  return (
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
  );
};