'use client';
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  Grid,
  Group,
  Image,
  Indicator,
  Modal,
  rem,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import {
  fMinutes,
  getTmdbImage,
  getVidSrcStreamUrl,
  ImageSize,
} from '@/features/film/film.helper';
import React, { useEffect, useState } from 'react';
import { type MovieDetail as TMovieDetail } from '@/features/film/types/movie.type';
import { MovieCredit } from '@/features/film/types/credits.type';
import { fetchFilmCredits } from '@/features/film/actions/film.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { MovieCastCard } from '@/features/film/components/movies/MovieCastCard';
import { VideoResponse } from '@/features/film/types/video.type';
import {
  checkStreamAvailability,
  fetchFilmImages,
  fetchFilmVideos,
  fetchKeywords,
} from '@/features/film/actions/movie.action';
import Link from 'next/link';
import { fUSD } from '@/utils/formatter.helper';
import { MovieCrewCard } from '@/features/film/components/movies/MovieCrewCard';
import { useDisclosure } from '@mantine/hooks';
import { VideoCard } from '@/features/film/components/movies/VideoCard';
import { ImageCollection } from '@/features/film/types/image.type';
import { KeywordCollection } from '@/features/film/types/keyword.type';
import {
  IconCheck,
  IconCross,
  IconExternalLink,
  IconHeart,
  IconPlayerPlay,
} from '@tabler/icons-react';
import classes from './MovieDetail.module.css';

export type MovieDetailProps = {
  movie: TMovieDetail;
  children: React.ReactNode;
};

export enum MEDIA_TAB {
  VIDEO = 'Videos',
  BACKDROP = 'Backdrops',
  POSTER = 'Posters',
  LOGO = 'Logos',
}

export const MovieDetail = ({ movie, children }: MovieDetailProps) => {
  const [isMediaOpened, media] = useDisclosure(false);
  const [isAlertOpened, alert] = useDisclosure(true);
  const [isStreamOpened, stream] = useDisclosure(false);
  const [isStreamAvailable, setIsStreamAvailable] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<MEDIA_TAB>(MEDIA_TAB.VIDEO);
  const [keywords, setKeywords] = useState<KeywordCollection>({
    id: 0,
    keywords: [],
  });

  const [videos, setVideos] = useState<VideoResponse>({
    id: 0,
    results: [],
  });
  const [images, setImages] = useState<ImageCollection>({
    id: 0,
    backdrops: [],
    posters: [],
    logos: [],
  });
  const [credit, setCredit] = useState<MovieCredit>({
    id: 0,
    cast: [],
    crew: [],
  });

  useEffect(() => {
    fetchFilmVideos(FILM_TYPE.MOVIE, movie.id).then(setVideos);
    fetchFilmCredits(FILM_TYPE.MOVIE, movie.id).then(setCredit);
    fetchFilmImages(FILM_TYPE.MOVIE, movie.id).then(setImages);
    fetchKeywords(FILM_TYPE.MOVIE, movie.id).then(setKeywords);
    checkStreamAvailability({
      movieId: movie.id,
      type: FILM_TYPE.MOVIE,
    }).then(setIsStreamAvailable);
  }, [movie]);

  const movieMetaData = [
    {
      label: 'Status',
      value: movie.status,
    },
    {
      label: 'Original Languages',
      value: movie.original_language,
    },
    {
      label: 'Budget',
      value: fUSD(movie.budget),
    },
    {
      label: 'Revenue',
      value: fUSD(movie.revenue),
    },
    {
      label: 'Runtime',
      value: fMinutes(movie.runtime),
    },
    {
      label: 'Rating',
      value: movie.vote_average.toFixed(2),
    },
  ];

  return (
    <Grid p="xl" gutter="xl">
      <Grid.Col span={3}>
        <Modal
          opened={isStreamOpened}
          onClose={stream.close}
          title={`Stream ${movie.title}`}
          size="xl"
          centered
        >
          <Box
            component="iframe"
            src={getVidSrcStreamUrl({
              type: FILM_TYPE.MOVIE,
              movieId: movie.id,
            })}
            allowFullScreen={true}
            allow="fullscreen; autoplay"
            style={{ width: '100%', height: 419, border: 0 }}
          ></Box>
        </Modal>
        <Stack>
          <Box style={{ borderRadius: rem(1), overflow: 'hidden' }}>
            <Image src={getTmdbImage(movie.poster_path)} alt={movie.title} />
          </Box>
          {movieMetaData.map(metaData => (
            <Box key={metaData.label}>
              <Text fw="bold">{metaData.label}</Text>
              <Text size="xs">{metaData.value}</Text>
            </Box>
          ))}
          {Boolean(keywords.keywords.length) && (
            <Stack>
              <Text fw="bold">Keyword</Text>
              <Group gap="xs">
                {keywords.keywords.map(keyword => (
                  <Badge variant="light" radius="sm" key={keyword.id}>
                    {keyword.name}
                  </Badge>
                ))}
              </Group>
            </Stack>
          )}
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack gap="sm">
          <Stack gap={0}>
            {isStreamAvailable && isAlertOpened && (
              <Alert
                variant="light"
                color={isStreamAvailable ? 'teal' : 'red'}
                radius="md"
                withCloseButton
                title={
                  isStreamAvailable
                    ? 'Stream Available'
                    : 'Stream Not Available'
                }
                icon={isStreamAvailable ? <IconCheck /> : <IconCross />}
                onClose={isAlertOpened ? alert.close : alert.open}
              ></Alert>
            )}
            <Group align="flex-end">
              <Link
                className={classes.titleLink}
                href={movie.homepage}
                target="_blank"
              >
                <Title order={1} fw="bold">
                  {movie.title}
                  <sup>
                    <IconExternalLink size="1rem" stroke={1.5} />
                  </sup>
                </Title>
              </Link>
              <Text size={rem(30)}>
                ({new Date(movie.release_date).getFullYear()})
              </Text>
            </Group>
            <Text c="dimmed" fs="italic">
              {movie.tagline}
            </Text>
          </Stack>
          <Box>
            <Group gap="xs">
              {movie.genres.map(genre => (
                <Badge radius="sm" key={genre.id}>
                  {genre.name}
                </Badge>
              ))}
            </Group>
          </Box>
          <Group gap="xs">
            <Avatar color="blue">
              <IconHeart size="1.5rem" className={classes.actionButton} />
            </Avatar>
            {isStreamAvailable && (
              <Indicator size={11} processing position="top-start">
                <Button variant="subtle" onClick={stream.open}>
                  <Group gap="xs">
                    <IconPlayerPlay size={20} />
                    <Text>Streaming</Text>
                  </Group>
                </Button>
              </Indicator>
            )}
          </Group>
          <Box>
            <Text size="xl" fw="bold" pt="xs">
              Overview
            </Text>
            <Text>{movie.overview}</Text>
          </Box>
          <Group grow py="lg">
            {credit.crew
              .filter((_, i) => i < 4)
              .map(crew => (
                <Box key={crew.credit_id}>
                  <Text ta="center">{crew.name}</Text>
                  <Text ta="center" fw="bold">
                    {crew.job}
                  </Text>
                </Box>
              ))}
          </Group>
          {Boolean(credit.cast.length) && (
            <Box>
              <Text size="xl" mt="lg" fw="bold">
                Cast
              </Text>
              <ScrollArea offsetScrollbars>
                <Group wrap="nowrap">
                  {credit.cast
                    .filter((_, i) => i < 10)
                    .map(cast => (
                      <MovieCastCard cast={cast} key={cast.credit_id} />
                    ))}
                </Group>
              </ScrollArea>
            </Box>
          )}
          {Boolean(credit.crew.length) && (
            <Box>
              <Text size="xl" mt="lg" fw="bold">
                Crew
              </Text>
              <ScrollArea offsetScrollbars>
                <Group wrap="nowrap">
                  {credit.crew
                    .filter((_, i) => i < 10)
                    .map(crew => (
                      <MovieCrewCard crew={crew} key={crew.credit_id} />
                    ))}
                </Group>
              </ScrollArea>
            </Box>
          )}
          {Boolean(videos.results.length) && (
            <Box>
              <Group justify="space-between">
                <Text size="xl" my="lg" fw="bold">
                  Media
                </Text>
                <Button variant="transparent" onClick={media.open}>
                  See others
                </Button>
              </Group>
              <Drawer
                opened={isMediaOpened}
                onClose={media.close}
                title="Media"
                size="xl"
                position="right"
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
              >
                <Tabs
                  radius="xs"
                  value={activeTab}
                  onChange={value => {
                    setActiveTab(value as MEDIA_TAB);
                  }}
                >
                  <Tabs.List>
                    <Tabs.Tab value={MEDIA_TAB.VIDEO}>
                      <Text>
                        {MEDIA_TAB.VIDEO} ({videos.results.length})
                      </Text>
                    </Tabs.Tab>
                    <Tabs.Tab value={MEDIA_TAB.BACKDROP}>
                      <Text>
                        {MEDIA_TAB.BACKDROP} ({images.backdrops.length})
                      </Text>
                    </Tabs.Tab>
                    <Tabs.Tab value={MEDIA_TAB.POSTER}>
                      <Text>
                        {MEDIA_TAB.POSTER} ({images.posters.length})
                      </Text>
                    </Tabs.Tab>
                    <Tabs.Tab value={MEDIA_TAB.LOGO}>
                      <Text>
                        {MEDIA_TAB.LOGO} ({images.logos.length})
                      </Text>
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value={MEDIA_TAB.VIDEO}>
                    <ScrollArea scrollbars="x" offsetScrollbars py="md">
                      <Stack>
                        {videos.results.map(video => (
                          <VideoCard video={video} key={video.id} />
                        ))}
                      </Stack>
                    </ScrollArea>
                  </Tabs.Panel>
                  <Tabs.Panel value={MEDIA_TAB.BACKDROP}>
                    <ScrollArea scrollbars="x" offsetScrollbars py="md">
                      <Stack>
                        {images.backdrops.map(backdrop => (
                          <Image
                            src={getTmdbImage(
                              backdrop.file_path,
                              ImageSize.ORIGINAL,
                            )}
                            alt={'Background image'}
                            key={backdrop.file_path}
                          />
                        ))}
                      </Stack>
                    </ScrollArea>
                  </Tabs.Panel>
                  <Tabs.Panel value={MEDIA_TAB.POSTER}>
                    <ScrollArea scrollbars="x" offsetScrollbars py="md">
                      <Grid>
                        {images.posters.map(poster => (
                          <Grid.Col span={6} key={poster.file_path}>
                            <Image
                              src={getTmdbImage(
                                poster.file_path,
                                ImageSize.ORIGINAL,
                              )}
                              alt={'Background image'}
                            />
                          </Grid.Col>
                        ))}
                      </Grid>
                    </ScrollArea>
                  </Tabs.Panel>
                  <Tabs.Panel value={MEDIA_TAB.LOGO}>
                    <ScrollArea scrollbars="x" offsetScrollbars py="md">
                      <Stack>
                        {images.logos.map(logo => (
                          <Image
                            src={getTmdbImage(
                              logo.file_path,
                              ImageSize.ORIGINAL,
                            )}
                            alt={'Background image'}
                            key={logo.file_path}
                          />
                        ))}
                      </Stack>
                    </ScrollArea>
                  </Tabs.Panel>
                </Tabs>
              </Drawer>
              {/*<Drawer opened={opened} onClose={close} title="Media"*/}
              {/*        size="xl" position="right"*/}
              {/*        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>*/}
              {/*  <Tabs radius="xs" value={activeTab} onChange={setActiveTab}>*/}
              {/*    <Tabs.List>*/}
              {/*      {Object.keys(media).map(type => (*/}
              {/*        <Tabs.Tab value={type} key={type}>*/}
              {/*          <Text>{type} ({media[type].length})</Text>*/}
              {/*        </Tabs.Tab>*/}
              {/*      ))}*/}
              {/*    </Tabs.List>*/}

              {/*    {Object.keys(media).map(type => (*/}
              {/*      <Tabs.Panel value={type} key={type}>*/}
              {/*        <ScrollArea scrollbars="x" offsetScrollbars py="md">*/}
              {/*          <Stack>*/}
              {/*            {media[type].map(video => (*/}
              {/*              <VideoCard video={video} key={video.id} />*/}
              {/*            ))}*/}
              {/*          </Stack>*/}
              {/*        </ScrollArea>*/}
              {/*      </Tabs.Panel>*/}
              {/*    ))}*/}
              {/*  </Tabs>*/}
              {/*</Drawer>*/}
              {/*<Tabs radius="xs" value={activeTab} onChange={setActiveTab}>*/}
              {/*  <Tabs.List>*/}
              {/*    {Object.keys(media).map(type => (*/}
              {/*      <Tabs.Tab value={type} key={type}>*/}
              {/*        <Text>{type} ({media[type].length})</Text>*/}
              {/*      </Tabs.Tab>*/}
              {/*    ))}*/}
              {/*  </Tabs.List>*/}

              {/*  {videos.results.map(type => (*/}
              {/*    <Tabs.Panel value={type} key={type}>*/}
              {/*      <ScrollArea scrollbars="x" offsetScrollbars py="md">*/}
              {/*        /!*<Spoiler maxHeight={500} showLabel="Show more" hideLabel="Hide">*!/*/}
              {/*        <Group wrap="nowrap">*/}
              {/*          {media[type].map(video => (*/}
              {/*            <Box key={video.id}>*/}
              {/*              /!*<Text my="xs">{video.name} - {fDateTimeGB(new Date(video.published_at))}</Text>*!/*/}
              {/*              <Text my="xs">{video.name}</Text>*/}
              {/*              <Box*/}
              {/*                component="iframe"*/}
              {/*                src={`https://www.youtube.com/embed/${video.key}`}*/}
              {/*                allowFullScreen={true}*/}
              {/*                allow="fullscreen; autoplay"*/}
              {/*                style={{ width: 320, height: 216, border: 0 }}*/}
              {/*              ></Box>*/}
              {/*            </Box>*/}
              {/*          ))}*/}
              {/*        </Group>*/}
              {/*        /!*</Spoiler>*!/*/}
              {/*      </ScrollArea>*/}
              {/*    </Tabs.Panel>*/}
              {/*  ))}*/}
              {/*</Tabs>*/}
            </Box>
          )}
          <Box>{children}</Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
