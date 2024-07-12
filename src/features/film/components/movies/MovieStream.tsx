'use client';

import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { IconCheck, IconPlayerPlay, IconX } from '@tabler/icons-react';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { MovieDetail } from '@/features/film/types/movie.type';
import { fSlug } from '@/utils/slugify.helper';
import Link from 'next/link';

export type StreamAlertProps = {
  isStreamAvailable: boolean;
};

export const StreamAlert = ({ isStreamAvailable }: StreamAlertProps) => {
  const [isAlertOpen, alert] = useDisclosure(true);

  if (!isAlertOpen) {
    return null;
  }

  return (
    <Alert
      variant="light"
      color={isStreamAvailable ? 'teal' : 'red'}
      radius="md"
      withCloseButton
      title={isStreamAvailable ? 'Stream Available' : 'Stream Not Available'}
      icon={isStreamAvailable ? <IconCheck /> : <IconX />}
      onClose={alert.close}
    ></Alert>
  );
};

export type StreamMovieProps = {
  isStreamAvailable: boolean;
  movie: MovieDetail;
};

export const StreamMovie = ({ isStreamAvailable, movie }: StreamMovieProps) => {
  // const [isStreamOpened, stream] = useDisclosure(false);

  if (!isStreamAvailable) {
    return null;
  }

  return (
    <Box>
      {/*<Modal*/}
      {/*  overlayProps={{*/}
      {/*    backgroundOpacity: 0.5,*/}
      {/*    blur: 4,*/}
      {/*  }}*/}
      {/*  opened={isStreamOpened}*/}
      {/*  onClose={stream.close}*/}
      {/*  title={`Stream ${movie.title}`}*/}
      {/*  size="xl"*/}
      {/*  centered*/}
      {/*>*/}
      {/*  <Box*/}
      {/*    component="iframe"*/}
      {/*    src={getVidSrcStreamUrl({*/}
      {/*      type: ItemType.movie,*/}
      {/*      movieId: movie.id,*/}
      {/*    })}*/}
      {/*    allowFullScreen={true}*/}
      {/*    allow="fullscreen; autoplay"*/}
      {/*    style={{ width: '100%', height: 419, border: 0 }}*/}
      {/*  ></Box>*/}
      {/*</Modal>*/}
      {/*<Button variant="subtle" onClick={stream.open}>*/}
      {/*  <Group gap="xs">*/}
      {/*    <IconPlayerPlay size={20} />*/}
      {/*    <Text>Streaming</Text>*/}
      {/*  </Group>*/}
      {/*</Button>*/}

      <Button variant="subtle" component={Link} href={`/movies/${fSlug(movie.title, movie.id)}/watch`}>
        <Group gap="xs">
          <IconPlayerPlay size={20} />
          <Text>Streaming</Text>
        </Group>
      </Button>
    </Box>
  );
};
