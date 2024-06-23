'use client';
import { Box } from '@mantine/core';
import { BackButton } from '@/features/app/BackButton';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: {
    s: string;
    e: string;
  };
}

export default function Page({ params, searchParams }: PageProps) {

  let url = `https://vidsrc.to/embed/movie/${params.id}`;
  if (searchParams.s) {
    url = `https://vidsrc.to/embed/tv/${params.id}/${searchParams.s}`;
  }
  if (searchParams.e) {
    url += `/${searchParams.e}`;
  }

  return (
    <Box style={{ height: '100vh', position: 'relative' }}>
      <BackButton />
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