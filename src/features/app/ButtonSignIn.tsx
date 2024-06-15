"use client";

import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ButtonSignIn = () => {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return null;
  }
  return (
    <Group visibleFrom="sm">
      <Link href="/auth">
        <Button>Sign in</Button>
      </Link>
    </Group>
  );
};
