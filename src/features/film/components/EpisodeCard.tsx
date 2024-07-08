import { Box, Card, Group, Image, Modal, Text } from '@mantine/core';
import { getTmdbImage, getVidSrcStreamUrl } from '../film.helper';
import { Episode } from '../types/movie.type';
import classes from '@/features/film/styles/EpisodeCard.module.css';
import React from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ItemType } from '@prisma/client';
import { TVSeriesDetail } from '@/features/film/types/series.type';
import { MOBILE_BREAKPOINT } from '@/constant';

export type EpisodeCardProps = {
  episode: Episode;
  seasonNumber: number;
  tvSeries: TVSeriesDetail
};

export function EpisodeCard({ episode, seasonNumber, tvSeries }: EpisodeCardProps) {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [isModalOpen, modal] = useDisclosure(false);

  return (
    <Box>

      <Modal
        opened={isModalOpen}
        onClose={modal.close}
        title={`Stream ${episode.episode_number}. ${episode.name}`}
        size="xl"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Box
          component="iframe"
          src={getVidSrcStreamUrl({
            type: ItemType.tv,
            tvSeriesId: tvSeries.id,
            season: seasonNumber,
            episode: episode.episode_number,
          })}
          allowFullScreen={true}
          allow="fullscreen; autoplay"
          style={{ width: '100%', height: 419, border: 0 }}
        ></Box>
      </Modal>
      <Card w="100%" radius="md" p={0} className={classes.card} onClick={modal.open}>
        <Group wrap="nowrap" gap={0}>
          <Image
            className={classes.image}
            src={getTmdbImage(episode.still_path)}
            alt={episode.name}
          />
          <Box px="md" w="100%" className={classes.cardBody}>
            <Group justify="space-between" wrap="nowrap">
              <Text className={classes.title} tt="uppercase" lineClamp={1} fw={700}>
                S{seasonNumber}E{episode.episode_number}{' '}{episode.name}
              </Text>
              <Text>{episode.runtime}m</Text>
            </Group>
            <Text mt="xs" mb="md" lineClamp={isMobile ? 3 : 4}>
              {episode.overview}
            </Text>
          </Box>
        </Group>
      </Card>
    </Box>
  );
}
