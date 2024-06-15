import { Card, Group, Image, Text } from "@mantine/core";
import { getTmdbImage } from "../film.helper";
import { Episode } from "../types/movie.type";
import classes from "./EpisodeCard.module.css";

export type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Card w="100%" radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <Image
          src={getTmdbImage(episode.still_path)}
          height={160}
          alt={episode.name}
        />
        <div className={classes.body}>
          <Group justify="space-between">
            <Text className={classes.title} tt="uppercase" fw={700}>
              {episode.episode_number}.{" "}{episode.name}
            </Text>
            <Text>{episode.runtime}m</Text>
          </Group>
          <Text mt="xs" mb="md">
            {episode.overview}
          </Text>
        </div>
      </Group>
      </Card>
  );
}
