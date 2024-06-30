'use client';
import { Avatar, Box, Group, Rating, Stack, Text } from '@mantine/core';
import { getTmdbImage } from '../film.helper';
import { useEffect, useState } from 'react';
import { Review } from '../types/film.type';
import { fDateTimeGB } from '@/utils/formatter.helper';

export type CommentProps = {
  review: Review;
};

export function Comment({ review }: CommentProps) {
  const defaultAvatar = `https://api.dicebear.com/8.x/avataaars/svg?seed=${review.author}`;
  const [imgUrl, setImgUrl] = useState<string>(defaultAvatar);

  useEffect(() => {
    if (review.author_details.avatar_path) {
      setImgUrl(getTmdbImage(review.author_details.avatar_path));
    }
  }, [review]);

  return (
    <div>
      <Group>
        <Avatar
          src={imgUrl}
          alt={review.author}
          radius="xl"
          onError={() => setImgUrl(defaultAvatar)}
        />
        <Stack gap={0}>
          <Text size="sm">{review.author}</Text>
          <Text size="xs" c="dimmed">
            {fDateTimeGB(new Date(review.created_at))}
          </Text>
          <Rating value={review.author_details.rating / 2} fractions={1} />
        </Stack>
      </Group>
      <Box pl={54}>
        {/*<Spoiler maxHeight={110} showLabel="Show more" hideLabel="Hide">*/}
        <Text
          pt="sm"
          size="sm"
          dangerouslySetInnerHTML={{ __html: review.content }}
        />
        {/*</Spoiler>*/}
      </Box>
    </div>
  );
}
