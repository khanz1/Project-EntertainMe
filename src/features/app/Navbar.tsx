"use client";

import { Group, Input } from "@mantine/core";
import classes from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { SwitchSearch } from "./Switch";
import { useFilm } from "../film/film.context";
const links = [
  { link: "/movies", label: "Movie" },
  { link: "/series", label: "Tv Series" },
  { link: "/manga", label: "Manga" },
  { link: "/about", label: "About" },
];
export const Navbar = () => {
  const { search, setSearch } = useFilm();
  const pathname = usePathname();

  if (pathname.startsWith("/movies/") || pathname.startsWith("/watch/") || pathname.startsWith("/tv/")) {
    return null;
  }

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
          {links.map((link) => (
            <Link key={link.label} href={link.link} className={classes.link}>
              {link.label}
            </Link>
          ))}
        </Group>
        <Group>
          <SwitchSearch />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Movie"
            leftSection={<IconSearch size={16} />}
          />
        </Group>
      </div>
    </header>
  );
};
