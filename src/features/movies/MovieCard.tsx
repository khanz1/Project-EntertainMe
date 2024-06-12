import classes from "./MovieCard.module.css";
import { Card, Text, Group, Box } from "@mantine/core";
import Link from "next/link";
import { BriefMovie } from "@/types/movie.type";
import { getTmdbImage } from "./movie.helper";

export type MovieCardProps = {
  movie: BriefMovie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link style={{ textDecoration: "none" }} href={`/movies/${movie.id}`}>
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        w={250}
        h={350}
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
            <Text size="lg" className={classes.title} fw={500}>
              {movie.title}
            </Text>

            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.author}>
                {movie.vote_average.toFixed(1)}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
