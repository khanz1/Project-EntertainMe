'use client';

import { Center, Grid, Group, Loader } from '@mantine/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FILM_FILTERS, ResData, WithType } from '@/features/film/types/film.type';
import { Movie } from '@/features/film/types/movie.type';
import { useRouter } from 'next/navigation';
import { fCapitalizeSpace } from '@/utils/formatter.helper';
import { FilmCard } from '@/features/film/components/FilmCard';
import { ItemType } from '@prisma/client';

const filterList = [FILM_FILTERS.POPULAR, FILM_FILTERS.TOP_RATED, FILM_FILTERS.UPCOMING, FILM_FILTERS.NOW_PLAYING].map(
  f => ({
    label: f === FILM_FILTERS.NONE ? 'Select Filter' : fCapitalizeSpace(f),
    value: f,
  }),
);

export type MovieListProps = {
  movies: ResData<WithType<Movie>[]>;
  page: number;
  hasMoreMovies: boolean;
  filter: string;
};

export const MovieList = ({ movies, hasMoreMovies, page, filter }: MovieListProps) => {
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
        {/*<Group justify="space-between" pb="md" px={{ base: 0, sm: 'md' }}>*/}
        {/*  <Select*/}
        {/*    placeholder="Pick value"*/}
        {/*    data={filterList}*/}
        {/*    value={filter}*/}
        {/*    onChange={handleOnFilterChange}*/}
        {/*  />*/}
        {/*  <Text>*/}
        {/*    {fThousandsNumber(movies.results.length)} from{' '}*/}
        {/*    {fThousandsNumber(movies.total_results)}*/}
        {/*  </Text>*/}
        {/*</Group>*/}

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
          <Group gap="md" align="center">
            {movies.results.map(movie => (
              <FilmCard key={movie.id} film={movie} type={ItemType.movie} />
            ))}
          </Group>
        </InfiniteScroll>
      </Grid.Col>
    </Grid>
  );
};
