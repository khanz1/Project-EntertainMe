import { Button, Container, Text, Title } from '@mantine/core';
import classes from './page.module.css';
import Link from 'next/link';

export default function Page() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>Dragon Ball Super</Title>

            <Text className={classes.description} mt={30} lineClamp={4}>
              The events of Battle of Gods take place some years after the battle with Majin Buu, which determined the
              fate of the entire universe. After awakening from a long slumber, Beerus, the God of Destruction is
              visited by Whis, his attendant and learns that the galactic overlord Frieza has been defeated by a Super
              Saiyan from the North Quadrant of the universe named Goku, who is also a former student of the North Kai.
              Ecstatic over the new challenge, Goku ignores King Kai&#39;s advice and battles Beerus, but he is easily
              overwhelmed and defeated. Beerus leaves, but his eerie remark of &#34;Is there nobody on Earth more worthy
              to destroy?&#34; lingers on. Now it is up to the heroes to stop the God of Destruction before all is lost.
            </Text>

            <Button
              component={Link}
              href={'/movies/dragon-ball-z-battle-of-gods-126963'}
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Watch Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
