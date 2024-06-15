"use client";

import {
  ScrollArea,
  Stack,
  Center,
  Group,
  Badge,
  Rating,
  Button,
  Tabs,
  Text,
  rem,
  NativeSelect,
} from "@mantine/core";
import { IconPhoto, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";
import { TVSeriesDetail } from "../types/series.type";
import { ResData, Review } from "../types/film.type";
import { Comment } from "./Comment";
import { useState } from "react";
import { SeasonSection } from "./SeasonSection";

export type DetailTVSeriesProps = {
  tvSeries: TVSeriesDetail;
  reviews: ResData<Review[]>;
};

export enum TABS {
  COMMENTS = "comments",
  SEASONS = "seasons",
}

export const DetailTVSeries = ({ tvSeries, reviews }: DetailTVSeriesProps) => {
  const [activeTab, setActiveTab] = useState<TABS>(TABS.SEASONS);
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <ScrollArea h="100vh" w="100%" pr="xl">
      <Stack gap="xs" justify="center" py="xl">
        <Text tt="uppercase" ta="center" fw={700} size="xl">
          {tvSeries.name}
        </Text>
        <Center>
          <Text mt="xs" ta="center" maw={600}>
            {tvSeries.overview}
          </Text>
        </Center>
        <Group gap="xs" justify="center">
          {tvSeries.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </Group>
        <Center>
          <Rating value={tvSeries.vote_average / 2} fractions={2} readOnly />
        </Center>
        <Group justify="center" wrap="nowrap" gap="xs">
          <Link href={`/watch/${tvSeries.id}`}>
            <Button color="blue" variant="light">
              Watch
            </Button>
          </Link>
        </Group>
        <Tabs
          radius="xs"
          value={activeTab}
          onChange={(value) => setActiveTab((value as TABS) ?? activeTab)}
        >
          <Tabs.List>
            <Tabs.Tab
              value={TABS.SEASONS}
              leftSection={<IconPhoto style={iconStyle} />}
            >
              {TABS.SEASONS}
            </Tabs.Tab>
            <Tabs.Tab
              value={TABS.COMMENTS}
              leftSection={<IconMessageCircle style={iconStyle} />}
            >
              {TABS.COMMENTS}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={TABS.SEASONS}>
            <Stack py="lg">
              <SeasonSection tvSeries={tvSeries} />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value={TABS.COMMENTS}>
            {reviews.total_results ? (
              <Stack gap="md" mt="lg">
                {reviews.results
                  .toSorted((a, b) => (b.created_at < a.created_at ? -1 : 1))
                  .map((review) => (
                    <Comment key={review.id} review={review} />
                  ))}
              </Stack>
            ) : null}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ScrollArea>
  );
};
