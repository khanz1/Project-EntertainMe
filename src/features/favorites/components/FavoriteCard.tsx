import classes from './FavoriteCard.module.css';
import { Box, Card, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { fSlug } from '@/utils/slugify.helper';
import { Favorites, ItemType } from '@prisma/client';
import { useMediaQuery } from '@mantine/hooks';
import { APP } from '@/constant';

export type MovieCardProps = {
  favorite: Favorites;
};

export function FavoriteCard({ favorite }: MovieCardProps) {
  const isMobile = useMediaQuery(APP.MOBILE_BREAKPOINT);
  const itemType = favorite.itemType === ItemType.movie ? 'movies' : favorite.itemType;
  let detailPage = `/${itemType}/${fSlug(favorite.itemTitle, favorite.itemId)}`;
  if (isMobile) {
    return (
      <Card component={Link} href={detailPage} w="100%" radius="md" p={0} className={classes.cardMobile}>
        <Group wrap="nowrap" gap={0} className={classes.cardBodyMobile}>
          <Image className={classes.imageMobile} src={favorite.itemImage} alt={favorite.itemTitle} />
          <Box px="md" pt="sm" w="100%">
            <Group justify="space-between" wrap="nowrap">
              <Text className={classes.titleMobile} tt="uppercase" lineClamp={1} fw={700}>
                {favorite.itemTitle}
              </Text>
              <Text>{favorite.itemRating.toFixed(2)}</Text>
            </Group>
            <Text mt="xs" mb="md" lineClamp={3}>
              {favorite.itemOverview}
            </Text>
          </Box>
        </Group>
      </Card>
    );
  }

  return (
    <Link style={{ textDecoration: 'none' }} href={detailPage}>
      <Card p="lg" shadow="lg" className={classes.card} radius="md" w={200} h={300}>
        <Box
          className={classes.image}
          style={{
            backgroundImage: `url(${favorite.itemImage})`,
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text className={classes.title} fw={500} lineClamp={1}>
              {favorite.itemTitle}
            </Text>

            <Group gap="xs">
              <Text size="sm" className={classes.author} tt="capitalize">
                {favorite.itemType}
              </Text>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="sm" className={classes.author}>
                {favorite.itemRating?.toFixed(2)}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
