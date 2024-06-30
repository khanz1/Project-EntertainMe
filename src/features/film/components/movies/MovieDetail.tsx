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
  Modal,
  rem,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { fMinutes, getTmdbImage, getVidSrcStreamUrl, ImageSize } from '@/features/film/film.helper';
import React, { useEffect, useMemo, useState } from 'react';
import { type MovieDetail as TMovieDetail } from '@/features/film/types/movie.type';
import { Crew, MovieCredit } from '@/features/film/types/credits.type';
import { fetchFilmCredits, fetchKeywords } from '@/features/film/actions/film.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { MovieCastCard } from '@/features/film/components/movies/MovieCastCard';
import { VideoResponse } from '@/features/film/types/video.type';
import { checkStreamAvailability, fetchFilmImages, fetchFilmVideos } from '@/features/film/actions/movie.action';
import Link from 'next/link';
import { fUSD } from '@/utils/formatter.helper';
import { useDisclosure } from '@mantine/hooks';
import { VideoCard } from '@/features/film/components/movies/VideoCard';
import { ImageCollection } from '@/features/film/types/image.type';
import { KeywordCollection } from '@/features/film/types/keyword.type';
import { IconArrowRight, IconCheck, IconCross, IconExternalLink, IconHeart, IconPlayerPlay } from '@tabler/icons-react';
import classes from './MovieDetail.module.css';
import { MovieCrewCard } from '@/features/film/components/movies/MovieCrewCard';

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

export enum CAST_TAB {
  CAST = 'Cast',
  CREW = 'Crew',
}

export const MovieDetail = ({ movie, children }: MovieDetailProps) => {
  const [isMediaOpened, media] = useDisclosure(false);
  const [isAlertOpened, alert] = useDisclosure(true);
  const [isStreamOpened, stream] = useDisclosure(false);
  const [isCastOpened, cast] = useDisclosure(false);

  const [isStreamAvailable, setIsStreamAvailable] = useState(false);
  const [castActiveTab, setCastActiveTab] = useState<CAST_TAB>(CAST_TAB.CAST);

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

  const crewList: Record<string, Crew[]> = useMemo(() => {
    return credit.crew
      .reduce((acc: Record<string, Crew[]>, crew) => {
        if (!acc[crew.job]) {
          acc[crew.job] = [];
        }
        acc[crew.job].push(crew);
        return acc;
      }, {});
  }, [credit.crew]);

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
              // <Indicator size={11} processing position="top-start">
              <Button variant="subtle" onClick={stream.open}>
                <Group gap="xs">
                  <IconPlayerPlay size={20} />
                  <Text>Streaming</Text>
                </Group>
              </Button>
              // </Indicator>
            )}
          </Group>
          <Box>
            <Text size="xl" fw="bold" pt="xs">
              Overview
            </Text>
            <Text>{movie.overview}</Text>
          </Box>
          <Group py="lg" justify="space-between">
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
          <Drawer opened={isCastOpened} onClose={cast.close} size="xl" position="right"
                  title={`Cast of ${movie.title}`}>
            <Tabs value={castActiveTab} onChange={(v) => setCastActiveTab(v as CAST_TAB)}>
              <Tabs.List grow>
                <Tabs.Tab value={CAST_TAB.CAST}>
                  {CAST_TAB.CAST} ({credit.cast.length})
                </Tabs.Tab>
                <Tabs.Tab value={CAST_TAB.CREW}>
                  {CAST_TAB.CREW} ({credit.crew.length})
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value={CAST_TAB.CAST}>
                <Group justify="space-between" py="lg">
                  {credit.cast
                    .map(cast => (
                      <MovieCastCard cast={cast} key={cast.credit_id} />
                    ))}
                </Group>
              </Tabs.Panel>

              <Tabs.Panel value={CAST_TAB.CREW}>
                <Stack py="lg">
                  {Object.keys(crewList).map(crewJob => {
                    return (
                      <Stack key={crewJob}>
                        <Text size="xl" fw="bold">{crewJob}</Text>
                        <Group gap="md">
                          {crewList[crewJob]
                            .map(crew => (
                              <MovieCrewCard crew={crew} key={crew.credit_id} />
                            ))}
                        </Group>
                      </Stack>
                    );
                  })}
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Drawer>
          {Boolean(credit.cast.length) && (
            <Box mt="lg">
              <Group justify="space-between">
                <Text size="xl" fw="bold">
                  Cast ({credit.cast.length + credit.crew.length})
                </Text>
                <Button variant="transparent" onClick={cast.open}
                        className={classes.title} fw={500}>
                  View More <IconArrowRight />
                </Button>
              </Group>
              <Text pb="md">
                Top billed cast, displaying the actors in their respective roles.
              </Text>
              <ScrollArea offsetScrollbars>
                <Group wrap="nowrap">
                  {credit.cast
                    .filter((_, i) => i < 5)
                    .map(cast => (
                      <MovieCastCard cast={cast} key={cast.credit_id} />
                    ))}
                  {/*<Box w={200} h={300} display="flex" style={{ alignItems: 'center' }}>*/}
                  {/*  <Button variant="transparent" onClick={cast.open}*/}
                  {/*          className={classes.title} fw={500}>*/}
                  {/*    View More <IconArrowRight />*/}
                  {/*  </Button>*/}
                  {/*</Box>*/}
                </Group>
              </ScrollArea>
            </Box>
          )}
          {Boolean(videos.results.length) && (
            <Box>
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
              <Stack gap={0}>
                <Group justify="space-between">
                  <Text size="xl" fw="bold">
                    Media ({videos.results.length})
                  </Text>
                  {videos.results.length > 3 && (
                    <Button variant="transparent" onClick={media.open}
                            className={classes.title} fw={500}>
                      View More <IconArrowRight />
                    </Button>
                  )}
                </Group>
                <Text pb="md">Explore photos, videos, and other media related to the movie.</Text>
                <ScrollArea offsetScrollbars>
                  <Group wrap="nowrap" gap="xs">
                    <Box
                      component="iframe"
                      src={`https://www.youtube.com/embed/${videos.results[0].key}`}
                      allowFullScreen={true}
                      allow="fullscreen; autoplay"
                      style={{ width: '100%', height: 250, border: 0 }}
                    ></Box>
                    {Boolean(images.backdrops.length) && (
                      <Image
                        src={getTmdbImage(
                          images.backdrops[0].file_path,
                          ImageSize.ORIGINAL,
                        )}
                        alt={'Background image'}
                        height={250}
                      />
                    )}
                    {Boolean(images.posters.length) && (
                      <Image
                        src={getTmdbImage(
                          images.posters[0].file_path,
                          ImageSize.ORIGINAL,
                        )}
                        alt={'Background image'}
                        height={250}
                      />
                    )}
                  </Group>
                </ScrollArea>
              </Stack>
            </Box>
          )}
          <Box>{children}</Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
