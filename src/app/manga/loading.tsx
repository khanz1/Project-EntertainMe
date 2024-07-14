import { Box, Grid, GridCol, Group, rem, Skeleton, Stack } from '@mantine/core';
import React from 'react';
import classes from '@/app/movies/[slug]/page.module.css';

export default async function Default() {
  return (
    <Box style={{ background: 'var(--mantine-color-dark-8)', minHeight: '100vh', position: 'relative' }}>
      <Box
        className={classes.overlay}
        style={{
          background: `linear-gradient(to bottom, transparent 0%, var(--mantine-color-dark-8) 70%, var(--mantine-color-dark-8) 100%), var(--mantine-color-dark-2) no-repeat center center/cover`,
        }}
      ></Box>
      <Box className={classes.container}>
        <Grid p={{ base: 'md', sm: 'xl' }} gutter="xl">
          <GridCol span={{ base: 12, lg: 3 }}>
            <Stack>
              <Box style={{ borderRadius: rem(1), overflow: 'hidden' }}>
                <Skeleton width="100%" height={300} />
              </Box>

              <Skeleton width="100%" height={30} />
              <Skeleton width="100%" height={30} />
              <Group visibleFrom="lg" gap="xs">
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
              </Group>
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, lg: 9 }}>
            <Stack gap="sm">
              <Stack gap="xs">
                <Skeleton width="100%" height={50} />
                <Skeleton width="100%" height={40} />
              </Stack>
              <Box>
                <Group gap="xs">
                  <Skeleton width={80} height={30} />
                  <Skeleton width={80} height={30} />
                  <Skeleton width={80} height={30} />
                  <Skeleton width={80} height={30} />
                  <Skeleton width={80} height={30} />
                  <Skeleton width={80} height={30} />
                </Group>
              </Box>
              <Group gap="xs">
                <Skeleton width={50} height={50} radius="xl" />
                <Skeleton width={150} height={50} />
              </Group>
              <Stack mt="xl">
                <Skeleton width="100%" height={35} />
                <Skeleton width="100%" height={30} />
                <Skeleton width="100%" height={30} />
                <Skeleton width="100%" height={30} />
                <Skeleton width="100%" height={30} />
              </Stack>
            </Stack>
          </GridCol>
        </Grid>
      </Box>
    </Box>
  );
}
