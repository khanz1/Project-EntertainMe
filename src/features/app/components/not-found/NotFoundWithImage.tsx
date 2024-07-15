import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import image from './NotFoundWithImage.svg';
import classes from './NotFoundWithImage.module.css';
import Link from 'next/link';

export function NotFoundWithImage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image.src} className={classes.mobileImage} alt="404 with women on the 0 searching" />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
            another URL. If you think this is an error contact support.
          </Text>
          <Link href={'/'}>
            <Button variant="outline" size="md" mt="xl" className={classes.control}>
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image src={image.src} className={classes.desktopImage} alt="404 with women on the 0 searching" />
      </SimpleGrid>
    </Container>
  );
}
