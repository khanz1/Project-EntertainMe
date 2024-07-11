import { BackgroundImage, Box, Button, Container, Stack } from '@mantine/core';
import classes from './page.module.css';
import Link from 'next/link';
import React from 'react';

export const Discover = () => {
  return (
    <Container size="xl" py="xl">
      <BackgroundImage
        className={classes.collectionBackground}
        src={'https://image.tmdb.org/t/p/original/gXSpNiP9a5uq0mo1hcfp2PVUsOV.jpg'}
        radius="md"
        py="xl"
      >
        <Box p="xl" style={{ zIndex: 2, position: 'relative' }}>
          <Stack gap="xl">
            <Link href={`/discover`}>
              <Button variant="light">Discover Movies</Button>
            </Link>
          </Stack>
        </Box>
      </BackgroundImage>
    </Container>
  );
};
