"use client";

import { fetchMovies } from "@/actions/movie.action";
import { MovieCard } from "@/features/movies/MovieCard";
import { BriefMovie } from "@/types/movie.type";
import { Box, Container, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<BriefMovie[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => setMovies(data.results));
  }, []);

  return (
    <Container size="xl" my={25}>
      <Text size="xl" fw={700}>
        Popular Movies
      </Text>
      <Box
        style={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "flex-start",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Container>
  );
}
