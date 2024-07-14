'use client';

import { Center, Container, Grid, Group, Loader } from '@mantine/core';
import { fetchManga, fetchMangaTags } from '@/features/manga/manga.action';
import { useEffect, useState } from 'react';
import { MangaCollection } from '@/features/manga/manga.type';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MangaCard } from '@/features/manga/components/MangaCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedValue } from '@mantine/hooks';
import { TagCollection } from '@/features/manga/types/tag.type';

const PAGE_SIZE = 20;

const defaultMangaCollection: MangaCollection = {
  result: '',
  response: '',
  data: [],
  limit: 0,
  offset: 0,
  total: 0,
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const search = searchParams.get('search') || '';
  const [debounced] = useDebouncedValue(search, 500);
  const defaultTags = searchParams.getAll('includedTags[]');

  const [selectedTags, setSelectedTags] = useState<string[]>(defaultTags);
  const [tags, setTags] = useState<TagCollection>({
    result: '',
    response: '',
    data: [],
    limit: 0,
    offset: 0,
    total: 0,
  });
  const [data, setData] = useState<MangaCollection>(defaultMangaCollection);

  useEffect(() => {
    fetchMangaTags().then(setTags);
  }, []);

  useEffect(() => {
    (async () => {
      if (data.data.length === 0 && page > 1) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', '1');
        router.push(url.toString());
        return;
      }

      const collection = await fetchManga({
        page,
        pageSize: PAGE_SIZE,
        searchTerm: debounced,
        selectedTags,
      });

      if (page === 1) {
        setData(collection);
      } else {
        setData(prev => ({
          ...prev,
          data: prev.data.concat(collection.data),
        }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debounced, selectedTags]);

  const hasMoreManga = data.data.length < data.total;

  return (
    <Container size="xxl">
      <Grid>
        {/*<Grid.Col visibleFrom="sm" span={2}>*/}
        {/*  <Card shadow="sm" radius="md" withBorder>*/}
        {/*    <Stack>*/}
        {/*      <Checkbox.Group*/}
        {/*        label="Filter by Genre"*/}
        {/*        value={selectedTags}*/}
        {/*        onChange={values => {*/}
        {/*          setData(defaultMangaCollection);*/}
        {/*          setSelectedTags(values);*/}
        {/*          const url = new URL(window.location.href);*/}
        {/*          url.searchParams.delete('includedTags[]');*/}
        {/*          for (const tag of values) {*/}
        {/*            url.searchParams.append('includedTags[]', tag);*/}
        {/*          }*/}

        {/*          router.push(url.toString(), {*/}
        {/*            scroll: false,*/}
        {/*          });*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <Stack mt="xs">*/}
        {/*          {tags.data*/}
        {/*            .filter(tag => tag.attributes.group === 'genre')*/}
        {/*            .toSorted((a, b) => {*/}
        {/*              if (a.attributes.name.en && b.attributes.name.en) {*/}
        {/*                return a.attributes.name.en.localeCompare(b.attributes.name.en);*/}
        {/*              }*/}
        {/*              return 1;*/}
        {/*            })*/}
        {/*            .map(tag => (*/}
        {/*              <Checkbox key={tag.id} value={tag.id} label={tag.attributes.name.en} />*/}
        {/*            ))}*/}
        {/*        </Stack>*/}
        {/*      </Checkbox.Group>*/}
        {/*    </Stack>*/}
        {/*  </Card>*/}
        {/*</Grid.Col>*/}
        <Grid.Col span={{ base: 12, sm: 12 }}>
          {/*<Group justify="space-between" mb="md" mx="md">*/}
          {/*  <Text>*/}
          {/*    {fThousandsNumber(data.data.length)} from {fThousandsNumber(data.total)}*/}
          {/*  </Text>*/}
          {/*</Group>*/}
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
