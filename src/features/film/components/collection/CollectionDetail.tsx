'use client';
import { Box, Grid, Group, Image, Stack, Text, Title } from '@mantine/core';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import { MovieCard, MovieCardMobile } from '@/features/film/components/MovieCard';
import { Collection } from '@/features/film/types/collection.type';
import classes from './CollectionDetail.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_BREAKPOINT } from '@/constant';

export const CollectionDetail = ({ collection }: { collection: Collection }) => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  return (
    <Box style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Grid className={classes.container}>
        <Grid.Col span={{ base: 12, lg: 4 }} px="xl">
          <Image
            className={classes.image} src={getTmdbImage(collection.poster_path, ImageSize.LARGE)}
            radius="md"
            alt={collection.name}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }} px="lg">
          <Stack justify="center" h="100%">
            <Title component={Text} order={1} fw="bold">{collection.name}</Title>
            <Text>{collection.overview}</Text>
            <Group gap="xs">
              {collection.parts.map(part => {
                if (isMobile) {
                  return <MovieCardMobile movie={part} key={part.id} />;
                } else {
                  return <MovieCard movie={part} key={part.id} />;
                }
              })}
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
};