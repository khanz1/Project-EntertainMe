import { Box, Card, Group, Image, Modal, Stack, Text } from '@mantine/core';
import classes from './VideoCard.module.css';
import { Video } from '@/features/film/types/video.type';
import React from 'react';
import { fDateTimeGB } from '@/utils/formatter.helper';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { MOBILE_BREAKPOINT } from '@/constant';

export type EpisodeCardProps = {
  video: Video;
};

export function VideoCard({ video }: EpisodeCardProps) {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} size="xl" onClose={close} title={`${video.type} - ${video.name}`}>
        <Box
          component="iframe"
          src={`https://www.youtube.com/embed/${video.key}`}
          allowFullScreen={true}
          allow="fullscreen; autoplay"
          style={{ width: '100%', height: 419, border: 0 }}
        ></Box>
      </Modal>
      <Card w="100%" radius="md" p={0} onClick={open} className={classes.card}>
        {isMobile ? (
          <Stack gap={0}>
            <Image
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              alt={video.name}
            />
            <Stack pt="md" w="100%" gap={0}>
              <Group justify="space-between">
                <Text className={classes.title} tt="uppercase" lineClamp={1} fw={700}>
                  {video.name}
                </Text>
                <Text>{video.type}</Text>
              </Group>
              <Text mb="md">
                {fDateTimeGB(new Date(video.published_at))}
              </Text>
            </Stack>
          </Stack>
        ) : (
          <Group wrap="nowrap" gap={0}>
            <Image
              className={classes.image}
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              alt={video.name}
            />
            <Stack px="md" w="100%">
              <Group justify="space-between" wrap="nowrap">
                <Text className={classes.title} tt="uppercase" lineClamp={1} fw={700}>
                  {video.name}
                </Text>
                <Text>{video.type}</Text>
              </Group>
              <Text mt="xs" mb="md">
                {fDateTimeGB(new Date(video.published_at))}
              </Text>
            </Stack>
          </Group>
        )}
      </Card>
    </>
  );
}
