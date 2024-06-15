import Link from "next/link";
import {
  Image,
  Text,
  Group,
  Badge,
  Rating,
  ActionIcon,
  Box,
  Stack,
  Button,
  ScrollArea,
  Center,
} from "@mantine/core";
// import classes from "@/features/film/styles/movie-detail.module.css";
import { IconArrowLeft } from "@tabler/icons-react";
import { Comment } from "@/features/film/components/Comment";
import { fetchMovieById, fetchReviews } from "@/features/film/film.action";
import { FILM_TYPE } from "@/features/film/types/film.type";
import { getTmdbImage } from "@/features/film/film.helper";

export type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const [movie, reviews] = await Promise.all([
    fetchMovieById(Number(params.id)),
    fetchReviews(Number(params.id), FILM_TYPE.MOVIE),
  ]);

  return (
    <Box>
      <Link href="/">
        <ActionIcon
          style={{ position: "absolute", top: "1%", left: "1%" }}
          variant="subtle"
          color="white"
          size="xl"
          radius="xs"
          aria-label="Button Back"
        >
          <IconArrowLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Link>
      <Group wrap="nowrap" gap="xl">
        <Image
          src={getTmdbImage(movie.poster_path)}
          h="100vh"
          alt={movie.title}
        />
        <ScrollArea h="100vh" w="100%" pr="xl">
          <Stack gap="xs" justify="center" py="xl">
            <Text tt="uppercase" ta="center" fw={700} size="xl">
              {movie.title}
            </Text>

            <Group gap="sm" justify="center">
              {movie.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </Group>
            <Center>
              <Text mt="xs" ta="center" mb="md" maw={600}>
                {movie.overview}
              </Text>
            </Center>
            <Center>
              <Rating value={movie.vote_average / 2} fractions={2} readOnly />
            </Center>
            <Group justify="center" wrap="nowrap" gap="xs">
              <Link href={`/watch/${movie.id}`}>
                <Button color="blue" variant="light" size="lg">
                  Watch
                </Button>
              </Link>
            </Group>

            {reviews.total_results ? (
              <Stack gap="md">
                <Text size="xl" fw="bold">
                  Comments
                </Text>
                {reviews.results
                  .toSorted((a, b) => b.created_at < a.created_at ? -1 : 1)
                  .map((review) => (
                    <Comment key={review.id} review={review} />
                  ))}
              </Stack>
            ) : null}
          </Stack>
        </ScrollArea>
      </Group>
    </Box>
  );
}
