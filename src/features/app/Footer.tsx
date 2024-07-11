import { ActionIcon, Container, Group, rem, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import classes from './Footer.module.css';
import Link from 'next/link';

const data = [
  {
    title: 'About',
    links: [
      { label: 'Developer', link: '#' },
      { label: 'Website', link: '#' },
    ],
  },
];

const social = {
  x: 'https://x.com/sonxavierr',
  github: 'https://github.com/khanz1',
  instagram: 'https://instagram.com/sonangga',
};

export function Footer() {
  const groups = data.map(group => {
    const links = group.links.map((link, index) => (
      <Link key={index} className={classes.link} href={link.link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      {/*<Container className={classes.inner}>*/}
      {/*  <div className={classes.logo}>*/}
      {/*    <AppLogo size={40} />*/}
      {/*    <Text size="xs" c="dimmed" className={classes.description}>*/}
      {/*      Build fully functional accessible web applications faster than ever*/}
      {/*    </Text>*/}
      {/*  </div>*/}
      {/*  <div className={classes.groups}>{groups}</div>*/}
      {/*</Container>*/}
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} khanz1.dev. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <Link href={social.x}>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Link>
          <Link href={social.github}>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Link>
          <Link href={social.instagram}>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Link>
        </Group>
      </Container>
    </footer>
  );
}
