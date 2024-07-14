import { Box, Group, Skeleton } from '@mantine/core';
import React from 'react';

export default function Loading() {
  return (
    <Box>
      <Group justify={'start'}>
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
        <Skeleton width={200} height={300} />
      </Group>
    </Box>
  );
}
