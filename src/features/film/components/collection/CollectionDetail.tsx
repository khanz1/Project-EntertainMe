'use client';
import { Box, Grid, Group, Image, Stack, Text, Title } from '@mantine/core';
import { getTmdbImage } from '@/features/film/film.helper';
import { Collection } from '@/features/film/types/collection.type';
import classes from '@/features/film/styles/CollectionDetail.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { APP, ImageSize } from '@/constant';
import { FilmCard, FilmCardMobile } from '@/features/film/components/FilmCard';
import { ItemType } from '@prisma/client';

export const CollectionDetail = ({ collection }: { collection: Collection }) => {
  const isMobile = useMediaQuery(APP.MOBILE_BREAKPOINT);
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
                  return <FilmCardMobile film={part} type={ItemType.movie} key={part.id} />;
                } else {
                  return <FilmCard film={part} type={ItemType.movie} key={part.id} />;
                }
              })}
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
};