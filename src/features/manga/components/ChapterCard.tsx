import { useEffect, useState } from 'react';
import { Chapter, ChapterResponse } from '@/features/manga/types/chapter.type';
import { fetchChapterById } from '@/features/manga/manga.action';
import { Box, Card, Group, Image, Stack, Text } from '@mantine/core';
import classes from '@/features/manga/styles/ChapterCard.module.css';
import { fDateTimeGB } from '@/utils/formatter.helper';
import Link from 'next/link';

export type ChapterCardProps = {
  chapter: Chapter;
};

export const ChapterCard = ({ chapter }: ChapterCardProps) => {
  const [content, setContent] = useState<ChapterResponse>({
    result: '',
    baseUrl: '',
    chapter: {
      hash: '',
      data: [],
      dataSaver: [],
    },
  });

  useEffect(() => {
    fetchChapterById(chapter.id).then(setContent);
  }, [chapter.id]);

  if (!content.chapter?.hash || !chapter.attributes.pages) {
    return null;
  }

  const url = new URL(window.location.href);
  url.pathname = url.pathname + `/${chapter.id}`;

  return (
    <Card component={Link} href={url.toString()} w="100%" radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <Image
          className={classes.image}
          src={`/api/manga/data-saver/${content.chapter.hash}/${content.chapter.dataSaver[0]}`}
          alt={chapter.attributes.title}
        />
        <Stack justify="space-between" px="md" w="100%">
          <Text className={classes.title} tt="uppercase" lineClamp={1} fw={700}>
            {chapter.attributes.chapter}. {chapter.attributes.title}
          </Text>
          <Box>
            <Text>Total Pages: {chapter.attributes.pages}</Text>
            <Text>Published: {fDateTimeGB(new Date(chapter.attributes.publishAt))}</Text>
          </Box>
        </Stack>
      </Group>
    </Card>
  );
};
