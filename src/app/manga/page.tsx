"use client";

import { MovieCard } from "@/features/film/components/MovieCard";
import { TVSeriesCard } from "@/features/film/components/TVSeriesCard";
import { isMovie, isTVSeries } from "@/features/film/film.helper";
import { FILM_FILTERS } from "@/features/film/types/film.type";
import { fCapitalizeSpace, fThousandsNumber } from "@/utils/formatter.helper";
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

export default function Page() {

  return (
    <Container size="xl" my={25}>
      <Grid>
        <Grid.Col span={2}>
          <Card shadow="sm" radius="md" withBorder>
            <InputLabel>Filter by Genre</InputLabel>
            <Stack my="sm">
              {/* {genres.map((genre) => (
                <Checkbox label={genre.name} key={genre.id} />
              ))} */}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={10}>
          <Group justify="space-between" mb="md" mx="md">
            <Select
              placeholder="Pick value"
              data={filterList}
              // value={filter}
              // onChange={(val) => {
              //   if (val) {
              //     setFilter(val as FILM_FILTERS);
              //   }
              // }}
            />
            <Text>
              {/* Showing {fThousandsNumber(filmList.results.length)} from{" "}
              {fThousandsNumber(filmList.total_results)} film */}
            </Text>
          </Group>
          {/* <InfiniteScroll
            // dataLength={filmList.results.length}
            // next={() => setPage((prev) => prev + 1)}
            // hasMore={hasMoreFilm}
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
          </InfiniteScroll> */}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
