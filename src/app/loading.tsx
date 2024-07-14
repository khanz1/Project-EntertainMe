import { Container, Group, Skeleton, Stack } from '@mantine/core';
import React from 'react';
import classes from '@/features/app/components/landing/page.module.css';

export default function Loading() {
  return (
    <div
      className={classes.root}
      style={{
        background: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, var(--mantine-color-dark-7) 70%), linear-gradient(180deg, rgba(130, 201, 30, 0) 0%, var(--mantine-color-dark-7) 80%), var(--mantine-color-dark-2)`,
      }}
    >
      <Container size="xl" className={classes.inner}>
        <div className={classes.content}>
          <Stack gap="xs">
            <Skeleton width="100%" height={35} />
            <Skeleton width="100%" height={50} />
            <Group py="md">
              <Skeleton width={100} height={35} />
              <Skeleton width={100} height={35} />
              <Skeleton width={100} height={35} />
            </Group>
            <Skeleton width="100%" height={35} />
            <Skeleton width="100%" height={35} />
            <Skeleton width="100%" height={35} />
            <Skeleton width="100%" height={35} />

            <Skeleton mt="xl" width={200} height={50} />
          </Stack>
        </div>
      </Container>
      <Container size="xl">
        <Skeleton width="100%" height={35} />
        <Group mt="md">
          <Skeleton width={200} height={300} />
          <Skeleton width={200} height={300} />
          <Skeleton width={200} height={300} />
          <Skeleton width={200} height={300} />
          <Skeleton width={200} height={300} />
          <Skeleton width={200} height={300} />
        </Group>
      </Container>
    </div>
  );
}
