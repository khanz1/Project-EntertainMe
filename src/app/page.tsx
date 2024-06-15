"use client";

import { MovieCard } from "@/features/film/components/MovieCard";
import { TVSeriesCard } from "@/features/film/components/TVSeriesCard";
import { useFilm } from "@/features/film/film.context";
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
  const { filmList, hasMoreFilm, filter, setFilter, setPage } = useFilm();

  return (
    <Container size="xl" my={25}>
      <Grid>
        <Grid.Col span={2}>
          <Card shadow="sm" radius="md" withBorder>
            <InputLabel>Filter by Genre</InputLabel>
            <Stack my="sm">
              <Checkbox label={"genre"} key={"genre a"} />
              <Checkbox label={"genre"} key={"genre b"} />
              <Checkbox label={"genre"} key={"genre c"} />
              <Checkbox label={"genre"} key={"genre d"} />
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
                  setFilter(val as FILM_FILTERS);
                }
              }}
            />
            <Text>
              Showing {fThousandsNumber(filmList.results.length)} from{" "}
              {fThousandsNumber(filmList.total_results)} film
            </Text>
          </Group>
          <InfiniteScroll
            dataLength={filmList.results.length} //This is important field to render the next data
            next={() => setPage((prev) => prev + 1)}
            hasMore={hasMoreFilm}
            loader={
              <Center my="xl">
                <Loader color="blue" />
              </Center>
            }
            // endMessage={
            //   <Text>
            //     <b>Yay! You have seen it all</b>
            //   </Text>
            // }
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
