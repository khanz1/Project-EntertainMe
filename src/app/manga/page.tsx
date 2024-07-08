'use client';

import { fThousandsNumber } from '@/utils/formatter.helper';
import { Card, Center, Container, Grid, Group, InputLabel, Loader, MultiSelect, Stack, Text } from '@mantine/core';
import { fetchManga } from '@/features/manga/manga.action';
import { useEffect, useState } from 'react';
import { ContentRating, MangaCollection } from '@/features/manga/manga.type';
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
  const contentRatingList = searchParams.getAll('content-rating') as ContentRating[];


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
        contentRatingList,
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
  }, [page, debounced, contentRatingList]);

  const hasMoreManga = data.data.length < data.total;

  return (
    <Container size="xl" my={25}>
      <Grid>
        <Grid.Col span={2}>
          <Card shadow="sm" radius="md" withBorder>
            <Stack>
              <InputLabel>Search</InputLabel>
              <MultiSelect
                data={[ContentRating.SAFE, ContentRating.SUGGESTIVE, ContentRating.EROTICA, ContentRating.PORNOGRAPHIC]}
                value={contentRatingList}
                onChange={(contents) => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('content-rating');
                  for (const content of contents) {
                    url.searchParams.append('content-rating', content);
                  }

                  router.push(url.toString(), {
                    scroll: false,
                  });
                }}
              />
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={10}>
          <Group justify="space-between" mb="md" mx="md">
            <Text>
              {fThousandsNumber(data.data.length)} from{' '}
              {fThousandsNumber(data.total)}
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
            <Group gap="sm">
              {data.data.map(manga => (
                <MangaCard manga={manga} key={manga.id} />
              ))}
            </Group>
          </InfiniteScroll>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
