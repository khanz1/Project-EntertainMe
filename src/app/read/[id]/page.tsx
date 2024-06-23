'use client';
import { ActionIcon, Box, Image, ScrollArea, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChapterResponse } from '@/features/manga/types/chapter.type';
import { fetchChapterById } from '@/features/manga/manga.action';

export type PageProps = {
  params: {
    id: string;
  }
};
export default function Page({ params }: PageProps) {
  const router = useRouter();
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
      <ActionIcon
        style={{ position: 'fixed', top: '1%', left: '1%', zIndex: 10 }}
        variant="subtle"
        color="white"
        size="xl"
        radius="xs"
        aria-label="Button Back"
        onClick={() => router.back()}
      >
        <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <ScrollArea>
        <Stack gap="md">
          {chapter.chapter.dataSaver.map((image, index) => (
            <Box key={index} style={{ height: '100vh', margin: 'auto' }}>
              <Image alt={`${index}`}
                     style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                     src={`${chapter.baseUrl}/data-saver/${chapter.chapter.hash}/${image}`} />
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
}