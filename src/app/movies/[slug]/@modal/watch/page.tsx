'use client';

import { Box, Modal } from '@mantine/core';
import { getVidSrcStreamUrl } from '@/features/film/film.helper';
import { ItemType } from '@prisma/client';
import React from 'react';
import { parseTitleAndIdFromSlug } from '@/utils/slugify.helper';
import { useRouter } from 'next/navigation';

export type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const { title, id } = parseTitleAndIdFromSlug(params.slug);
  // const [isStreamOpened, stream] = useDisclosure(false);

  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 4,
      }}
      opened={true}
      onClose={() => router.back()}
      title={`Stream ${title}`}
      size="xl"
      centered
    >
      <Box
        component="iframe"
        src={getVidSrcStreamUrl({
          type: ItemType.movie,
          movieId: id,
        })}
        allowFullScreen={true}
        allow="fullscreen; autoplay"
        style={{ width: '100%', height: 419, border: 0 }}
      ></Box>
    </Modal>
  );
}
