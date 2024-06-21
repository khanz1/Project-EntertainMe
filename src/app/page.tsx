"use client";

import { MovieCard } from "@/features/film/components/MovieCard";
import { TVSeriesCard } from "@/features/film/components/TVSeriesCard";
import { fetchFilmList, fetchGenreList, useFilm } from "@/features/film/film.context";
import { isMovie, isTVSeries } from "@/features/film/film.helper";
import { FetchProps, Film, FILM_FILTERS, Genre, ResData } from "@/features/film/types/film.type";
import { fCapitalizeSpace, fLowercaseUnderscore, fThousandsNumber } from "@/utils/formatter.helper";
import {
  Box,
  Card,
  Center,
  Checkbox,
  Container,
  Grid,
  Group,
  InputLabel,
  Loader,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const filterList = [
  FILM_FILTERS.POPULAR,
  FILM_FILTERS.TOP_RATED,
  FILM_FILTERS.UPCOMING,
  FILM_FILTERS.NOW_PLAYING,
  FILM_FILTERS.ON_THE_AIR,
  FILM_FILTERS.AIRING_TODAY,
].map((f) => ({
  label: fCapitalizeSpace(f),
  value: f,
}));
export const filmState: ResData<Film[]> = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1,
};

export default function Page() {
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filmList, setFilmList] = useState<ResData<Film[]>>(filmState);

  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
  const filter = searchParams.get("filter") as FILM_FILTERS || FILM_FILTERS.POPULAR;
  const [debounced] = useDebouncedValue(search, 500);


  useEffect(() => {
    fetchGenreList().then(setGenres);
  }, []);

  useEffect(() => {
    (async () => {
      console.log("fetching", filter, page, page)
      const options: Partial<FetchProps> = {
        page,
        filter,
      };

      if (debounced) {
        options.search = debounced;
      }
      const data = await fetchFilmList(options as FetchProps);

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
  // const { genres, filmList, hasMoreFilm, filter, setFilter, setPage } =
  //   useFilm();

  return (
    <Container size="xl" my={25}>
      <Grid>
        <Grid.Col span={2}>
          <Card shadow="sm" radius="md" withBorder>
            <InputLabel>Filter by Genre</InputLabel>
            <Stack my="sm">
              {genres.map((genre) => (
                <Checkbox label={genre.name} key={genre.id} />
              ))}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={10}>
          <Group justify="space-between" mb="md" mx="md">
            <Select
              placeholder="Pick value"
              data={filterList}
              value={filter}
              onChange={(val) => {
                if (val) {
                  const url = new URL(window.location.href);
                  url.searchParams.set("filter", val);
                  url.searchParams.set("page", "1");
                  router.push(url.toString());
                  // setFilter(val as FILM_FILTERS);
                }
              }}
            />
            <Text>
              Showing {fThousandsNumber(filmList.results.length)} from{" "}
              {fThousandsNumber(filmList.total_results)} film
            </Text>
          </Group>
          <InfiniteScroll
            dataLength={filmList.results.length}
            next={() => {
              const url = new URL(window.location.href);
              url.searchParams.set("page", (page + 1).toString());
              router.push(url.toString(), {
                scroll: false
              });
            }}
            hasMore={hasMoreFilm}
            loader={
              <Center my="xl">
                <Loader color="blue" />
              </Center>
            }
          >
            <Box
              style={{
                display: "flex",
                gap: 5,
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "flex-start",
              }}
            >
              {filmList.results.map((film) => {
                if (!film.vote_average) {
                  return null;
                }
                if (isMovie(film)) {
                  return <MovieCard key={film.id} movie={film} />;
                } else if (isTVSeries(film)) {
                  return <TVSeriesCard key={film.id} tvSeries={film} />;
                }
              })}
            </Box>
          </InfiniteScroll>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
