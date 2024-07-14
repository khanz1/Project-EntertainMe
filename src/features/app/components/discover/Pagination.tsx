'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ActionIcon, Group, rem } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const page = Number(useSearchParams().get('page') || 1);

  const handlePrevPage = () => {
    const prevLink = new URL(window.location.href);
    prevLink.searchParams.set('page', String(page - 1));

    router.push(prevLink.toString());
  };

  const handleNextPage = () => {
    const nextLink = new URL(window.location.href);
    nextLink.searchParams.set('page', String(page + 1));

    router.push(nextLink.toString());
  };

  const disableNext = page >= totalPages;
  const disablePrev = page <= 1;

  return (
    <>
      <Group gap="xs" py="lg" visibleFrom="sm">
        <ActionIcon disabled={disablePrev} onClick={handlePrevPage}>
          <IconChevronLeft style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
        <ActionIcon disabled={disableNext} onClick={handleNextPage}>
          <IconChevronRight style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Group>
      <Group gap="xs" py="lg" hiddenFrom="sm" grow>
        <ActionIcon disabled={disablePrev} onClick={handlePrevPage}>
          <IconChevronLeft style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
        <ActionIcon disabled={disableNext} onClick={handleNextPage}>
          <IconChevronRight style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Group>
    </>
  );
};
