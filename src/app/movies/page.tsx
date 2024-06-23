'use client';

import { MovieCard } from '@/features/film/components/MovieCard';
import { fetchMovies } from '@/features/film/film.action';
import { FetchProps, FILM_FILTERS, ResData } from '@/features/film/types/film.type';
import { fCapitalizeSpace, fThousandsNumber } from '@/utils/formatter.helper';
import { Center, Container, Grid, Group, Loader, Select, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Movie } from '@/features/film/types/movie.type';

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

export default function Page({ searchParams }: PageProps) {
  const router = useRouter();
  const [filmList, setFilmList] = useState<ResData<Movie[]>>(filmState);


  const search = searchParams.search || '';
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const filter = searchParams.filter ? searchParams.filter as FILM_FILTERS : search ? FILM_FILTERS.NONE : FILM_FILTERS.POPULAR;
  const [debounced] = useDebouncedValue(search, 500);

  useEffect(() => {
    (async () => {
      const options: Partial<FetchProps> = {
        page,
        filter,
      };

      if (debounced) {
        options.search = debounced;
      }
      const data = await fetchMovies(options as FetchProps);

      if (page === 1) {
        setFilmList(data);
      } else {
        setFilmList((prev) => ({
          ...prev,
          results: [...prev.results, ...data.results],
        }));
      }
    })();
  }, [page, filter, debounced]);

  const hasMoreFilm =
    filmList.results.length === 0
      ? true
      : filmList.results.length < filmList.total_results;

  return (
    <Container size="xl" my={25}>
      <Grid>
        <Grid.Col>
          <Group justify="space-between" mb="md" mx="md">
            <Select
              placeholder="Pick value"
              data={filterList}
              value={filter}
              onChange={(val) => {
                if (val) {
                  const url = new URL(window.location.href);
                  url.searchParams.set('filter', val);
                  url.searchParams.set('page', '1');
                  url.searchParams.delete('search');
                  router.push(url.toString());
                }
              }}
            />
            <Text>
              Showing {fThousandsNumber(filmList.results.length)} from{' '}
              {fThousandsNumber(filmList.total_results)} film
            </Text>
          </Group>
          <InfiniteScroll
            dataLength={filmList.results.length}
            next={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('page', (page + 1).toString());
              router.push(url.toString(), {
                scroll: false,
              });
            }}
            hasMore={hasMoreFilm}
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
              {filmList.results.map((film) => (
                <MovieCard key={film.id} movie={film} />
              ))}
            </Group>
          </InfiniteScroll>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
