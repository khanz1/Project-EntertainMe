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
  Tabs,
  rem,
} from "@mantine/core";
import { IconArrowLeft, IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { Comment } from "@/features/film/components/Comment";
import { fetchReviews, fetchSeriesById } from "@/features/film/film.action";
import { FILM_TYPE } from "@/features/film/types/film.type";
import { getTmdbImage } from "@/features/film/film.helper";
import { DetailTVSeries } from "@/features/film/components/DetailTvSeries";

export type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const [tvSeries, reviews] = await Promise.all([
    fetchSeriesById(Number(params.id)),
    fetchReviews(Number(params.id), FILM_TYPE.TV_SERIES),
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
          src={getTmdbImage(tvSeries.poster_path)}
          h="100vh"
          alt={tvSeries.name}
        />
        <DetailTVSeries tvSeries={tvSeries} reviews={reviews} />
      </Group>
    </Box>
  );
}
