import classes from "./MovieCard.module.css";
import { Card, Text, Group, Box } from "@mantine/core";
import Link from "next/link";
import { getTmdbImage } from "../film.helper";
import { Movie } from "../types/movie.type";

export type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link style={{ textDecoration: "none" }} href={`/movies/${movie.id}`}>
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        w={200}
        h={300}
      >
        <Box
          className={classes.image}
          style={{
            backgroundImage: `url(${getTmdbImage(movie.poster_path)})`,
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text className={classes.title} fw={500}>
              {movie.title}
            </Text>

            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.author}>
                {"Movie"}
              </Text>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="sm" className={classes.author}>
                {movie.vote_average?.toFixed(1)}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
