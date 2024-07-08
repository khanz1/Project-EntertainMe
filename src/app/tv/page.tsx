'use client';

import { FILM_FILTERS, ResData } from '@/features/film/types/film.type';
import { fCapitalizeSpace, fThousandsNumber } from '@/utils/formatter.helper';
import { Center, Container, Grid, Group, Loader, Select, Text } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TVSeries } from '@/features/film/types/series.type';
import { fetchTVSeries } from '@/features/film/actions/tv.action';
import { APP } from '@/constant';
import { ScrollToTop } from '@/features/app/ScrollToTop';
import { FilmCard, FilmCardMobile } from '@/features/film/components/FilmCard';
import { ItemType } from '@prisma/client';

const filterList = [
  FILM_FILTERS.POPULAR,
  FILM_FILTERS.TOP_RATED,
  FILM_FILTERS.ON_THE_AIR,
  FILM_FILTERS.AIRING_TODAY,
].map((f) => ({
  label: fCapitalizeSpace(f),
  value: f,
}));

const filmState: ResData<TVSeries[]> = {
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
  const isMobile = useMediaQuery(APP.MOBILE_BREAKPOINT);
  const router = useRouter();
  const [filmList, setFilmList] = useState<ResData<TVSeries[]>>(filmState);

  const search = searchParams.search || '';
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const filter = searchParams.filter ? searchParams.filter as FILM_FILTERS : search ? FILM_FILTERS.NONE : FILM_FILTERS.POPULAR;
  const [debounced] = useDebouncedValue(search, 500);


  useEffect(() => {
    (async () => {
      if (filmList.results.length === 0 && page > 1) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', '1');
        router.push(url.toString());
        return;
      }
      const data = await fetchTVSeries({
        page,
        filter,
        search,
      });

      if (filmList.results.length === 0) {
        setFilmList(data);
      } else if (page === 1) {
        setFilmList(data);
      } else {
        setFilmList((prevMovies) => ({
          ...data,
          results: [...prevMovies.results, ...data.results],
        }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, debounced]);

  const hasMoreFilm =
    filmList.results.length === 0
      ? true
      : filmList.results.length < filmList.total_results;

  return (
    <Container size="xl" my={25}>
      <ScrollToTop />
      <Grid>
        <Grid.Col>
          <Group justify="space-between" mb="md" mx={{ base: 0, sm: 'md' }}>
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
              {fThousandsNumber(filmList.results.length)} from{' '}
              {fThousandsNumber(filmList.total_results)}
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
              {filmList.results.map((film) => {
                if (isMobile) {
                  return <FilmCardMobile key={film.id} film={film} type={ItemType.tv} />;
                } else {
                  return <FilmCard key={film.id} film={film} type={ItemType.tv} />;
                }
              })}
            </Group>
          </InfiniteScroll>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
