'use client';
import { ActionIcon, Box } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export type PageParams = {
  id: string;
};

export type SearchParams = {
  s: string;
  e: string;
};

export default function Page() {
  const router = useRouter();
  const params = useParams<PageParams>();
  const searchParams = useSearchParams();

  let url = `https://vidsrc.to/embed/movie/${params.id}`;
  if (searchParams.get('s')) {
    url = `https://vidsrc.to/embed/tv/${params.id}/${searchParams.get('s')}`;
  }
  if (searchParams.get('e')) {
    url += `/${searchParams.get('e')}`;
  }

  return (
    <Box style={{ height: '100vh', position: 'relative' }}>
      <ActionIcon
        style={{ position: 'absolute', top: '1%', left: '1%', zIndex: 10 }}
        variant="subtle"
        color="white"
        size="xl"
        radius="xs"
        aria-label="Button Back"
        onClick={() => router.back()}
      >
        <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <Box
        component="iframe"
        src={url}
        allowFullScreen
        allow="fullscreen; autoplay"
        style={{ width: '100%', height: '100%', border: 0, position: 'absolute', top: 0, left: 0 }}
      ></Box>
    </Box>
  );
}