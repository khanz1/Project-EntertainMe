"use client";
import { Text, Avatar, Group } from "@mantine/core";
import { getTmdbImage } from "../film.helper";
import { useEffect, useState } from "react";
import { Review } from "../types/film.type";
import { fDateTimeGB } from "@/utils/formatter.helper";

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
        <div>
          <Text size="sm">{review.author}</Text>
          <Text size="xs" c="dimmed">
            {fDateTimeGB(new Date(review.created_at))}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {review.content}
      </Text>
    </div>
  );
}