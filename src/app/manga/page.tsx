'use client';

import { fThousandsNumber } from '@/utils/formatter.helper';
import { Box, Center, Container, Grid, Group, Loader, Text } from '@mantine/core';
import { fetchManga } from '@/features/manga/manga.action';
import { useEffect, useState } from 'react';
import { MangaCollection } from '@/features/manga/manga.type';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MangaCard } from '@/features/manga/components/MangaCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedValue } from '@mantine/hooks';

const PAGE_SIZE = 20;

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const search = searchParams.get('search') || '';
  const [debounced] = useDebouncedValue(search, 500);


  const [data, setData] = useState<MangaCollection>({
    result: '',
    response: '',
    data: [],
    limit: 0,
    offset: 0,
    total: 0,
  });


  useEffect(() => {
    (async () => {

      const collection = await fetchManga({
        page,
        pageSize: PAGE_SIZE,
        searchTerm: debounced,
      });

      if (page === 1) {
        setData(collection);
      } else {
        setData((prev) => ({
          ...prev,
          data: prev.data.concat(collection.data),
        }));
      }
    })();
  }, [page, debounced]);

  const hasMoreManga = data.total > data.data.length;

  return (
    <Container size="xl" my={25}>
      <Grid>
        {/*<Grid.Col span={2}>*/}
        {/*  <Card shadow="sm" radius="md" withBorder>*/}
        {/*    <InputLabel>Filter by Genre</InputLabel>*/}
        {/*    <Stack my="sm">*/}
        {/*      /!* {genres.map((genre) => (*/}
        {/*        <Checkbox label={genre.name} key={genre.id} />*/}
        {/*      ))} *!/*/}
        {/*    </Stack>*/}
        {/*  </Card>*/}
        {/*</Grid.Col>*/}
        <Grid.Col span={12}>
          <Group justify="space-between" mb="md" mx="md">
            <Text>
              Showing {fThousandsNumber(data.data.length)} from{' '}
              {fThousandsNumber(data.total)} manga
            </Text>
          </Group>
          <InfiniteScroll
            dataLength={data.data.length}
            next={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('page', (page + 1).toString());
              router.push(url.toString(), {
                scroll: false,
              });
            }}
            hasMore={hasMoreManga}
            loader={
              <Center my="xl">
                <Loader color="blue" />
              </Center>
            }
          >
            <Box
              style={{
                display: 'flex',
                gap: 5,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'flex-start',
              }}
            >
              {data.data.map(manga => (
                <MangaCard manga={manga} key={manga.id} />
              ))}
            </Box>
          </InfiniteScroll>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
