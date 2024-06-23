'use client';
import { IconArrowLeft } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();
  return (
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
  );
};