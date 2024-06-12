// import { TMDB_ACCESS_TOKEN, TMDB_HOST } from "@/constant";
import Link from "next/link";

// export default async function Page({ params }) {
//   const { id } = params;
//   const response = await fetch(`${TMDB_HOST}/3/movie/${id}`, {
//     headers: {
//       Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
//     },
//   });

//   const movie = await response.json();
//   return (
//     <div style={{ whiteSpace: "pre-wrap" }}>
//       <Link href={`/watch/${id}`}>watch</Link>
//       {JSON.stringify(movie, null, 8)}
//     </div>
//   );
// }

import {
  Image,
  Avatar,
  Text,
  Group,
  Badge,
  Rating,
  ActionIcon,
  Box,
  Stack,
  Button,
} from "@mantine/core";
import classes from "@/features/movies/movie-detail.module.css";
import { useEffect, useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { Movie } from "@/types/movie.type";
import { fetchMovieById } from "@/actions/movie.action";
import { getTmdbImage } from "@/features/movies/movie.helper";

export type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const movie = await fetchMovieById(Number(params.id));
  // const router = useRouter();
  // const [movie, setMovie] = useState<Movie | {}>({});
  // const params = useParams();

  // useEffect(() => {
  //   fetchMovieById()
  // }, [params]);

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
          // onClick={() => router.back()}
        >
          <IconArrowLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Link>
      <Group wrap="nowrap" grow justify="space-between" gap={"lg"}>
        <Image src={getTmdbImage(movie.poster_path)} h="100vh" />
        <Stack gap="xs">
          <Text tt="uppercase" fw={700} size="xl">
            {movie.title}
          </Text>

          <Badge color="rgba(145, 145, 145, 1)">Adventure</Badge>
          <Text className={classes.title} mt="xs" mb="md" maw={600}>
            {movie.overview}
          </Text>
          <Rating value={movie.vote_average / 2} fractions={2} readOnly />
          <Group wrap="nowrap" gap="xs">
            {/* <Group gap="xs" wrap="nowrap">
              <Avatar
                size={50}
                src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${movie.author.username}`}
              />
              <Text size="lg">- {movie.author.username}</Text>
            </Group> */}
            <Link href={`/watch/${movie.id}`}>
              <Button color="blue" variant="light" size="lg">
                Watch
              </Button>
            </Link>
          </Group>
        </Stack>
      </Group>
    </Box>
  );
}
