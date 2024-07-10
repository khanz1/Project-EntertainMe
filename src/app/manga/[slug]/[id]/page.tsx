'use client';
import { Box, Image, ScrollArea, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ChapterResponse } from '@/features/manga/types/chapter.type';
import { fetchChapterById } from '@/features/manga/manga.action';
import { BackButton } from '@/features/app/BackButton';

export type PageProps = {
  params: {
    id: string;
  };
};
export default function Page({ params }: PageProps) {
  const [chapter, setChapter] = useState<ChapterResponse>({
    result: '',
    baseUrl: '',
    chapter: {
      hash: '',
      data: [],
      dataSaver: [],
    },
  });

  useEffect(() => {
    fetchChapterById(params.id).then(setChapter);
  }, [params.id]);

  return (
    <Box style={{ height: '100vh', position: 'relative' }}>
      <BackButton />
      <ScrollArea>
        <Stack gap="md">
          {chapter.chapter.dataSaver.map((image, index) => (
            <Box key={index} style={{ height: '100vh', margin: 'auto' }}>
              <Image
                alt={`${index}`}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                src={`/api/manga/data-saver/${chapter.chapter.hash}/${image}`}
              />
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
}
