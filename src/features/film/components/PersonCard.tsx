import classes from './PersonCard.module.css';
import { Box, Card, Group, Text } from '@mantine/core';
import { Cast, Crew } from '@/features/film/types/credits.type';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import { APP } from '@/constant';

export type MoviePersonCardProps = {
  person: Cast | Crew;
  description: string;
};

export function PersonCard({ person, description }: MoviePersonCardProps) {
  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      // TODO: we have to use css don't do this because it will create an extra style next to it
      w={{ base: 185, sm: 230 }}
      h={300}
    >
      <Box
        className={classes.image}
        style={{
          ...(!person.profile_path && {
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            scale: 1.1,
          }),
          backgroundImage: `url(${person.profile_path ? getTmdbImage(person.profile_path, ImageSize.MEDIUM) : APP.NO_IMAGE})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="xs" className={classes.title} fw={500} lineClamp={1}>
            {person.name}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="xs" className={classes.author}>
              {description}
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}