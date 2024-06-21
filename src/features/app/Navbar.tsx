"use client";

import { Group, Input } from "@mantine/core";
import classes from "./Navbar.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SwitchSearch } from "./Switch";
import { useDebouncedValue } from "@mantine/hooks";

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
];
export const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const pathname = usePathname();
  const [debounced] = useDebouncedValue(search, 500);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("search", debounced);
    url.searchParams.set("page", "1");
    router.push(url.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  if (
    pathname.startsWith("/movies/") ||
    pathname.startsWith("/watch/") ||
    pathname.startsWith("/tv/")
  ) {
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
            rightSection={
              <IconX
                size={16}
                style={{
                  cursor: "pointer",
                  display: search ? "block" : "none",
                }}
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete("search");
                  router.push(url.toString());
                }}
              />
            }
          />
        </Group>
      </div>
    </header>
  );
};
