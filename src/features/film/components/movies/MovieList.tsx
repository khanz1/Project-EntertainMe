'use client';

import { Center, Grid, Group, Loader, Select, Text } from '@mantine/core';
import { MovieCard, MovieCardMobile } from '@/features/film/components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FILM_FILTERS, ResData, WithType } from '@/features/film/types/film.type';
import { Movie } from '@/features/film/types/movie.type';
import { useRouter } from 'next/navigation';
import { fCapitalizeSpace, fThousandsNumber } from '@/utils/formatter.helper';
import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_BREAKPOINT } from '@/constant';

const filterList = [
  FILM_FILTERS.POPULAR,
  FILM_FILTERS.TOP_RATED,
  FILM_FILTERS.UPCOMING,
  FILM_FILTERS.NOW_PLAYING,
].map((f) => ({
  label: f === FILM_FILTERS.NONE ? 'Select Filter' : fCapitalizeSpace(f),
  value: f,
}));

export type MovieListProps = {
  movies: ResData<WithType<Movie>[]>
  page: number;
  hasMoreMovies: boolean;
  filter: string;
}

export const MovieList = ({ movies, hasMoreMovies, page, filter }: MovieListProps) => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
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

  return (
    <Grid>
      <Grid.Col>
        <Group justify="space-between" pb="md" px={isMobile ? 0 : 'md'}>
          <Select
            placeholder="Pick value"
            data={filterList}
            value={filter}
            onChange={handleOnFilterChange}
          />
          <Text>
            {fThousandsNumber(movies.results.length)} from{' '}
            {fThousandsNumber(movies.total_results)}
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
            {movies.results.map((movie) => {
              if (isMobile) {
                return <MovieCardMobile key={movie.id} movie={movie} />;
              } else {
                return <MovieCard key={movie.id} movie={movie} />;
              }
            })}
          </Group>
        </InfiniteScroll>
      </Grid.Col>
    </Grid>
  );
};