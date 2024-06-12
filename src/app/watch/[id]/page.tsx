"use client";
import { ActionIcon, Box } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

export type PageParams = {
  id: string;
};

export default function Page() {
  const router = useRouter();
  const params = useParams<PageParams>();
  return (
    <Box style={{ height: "100vh" }}>
      <ActionIcon
        style={{ position: "absolute", top: "1%", left: "1%" }}
        variant="subtle"
        color="white"
        size="xl"
        radius="xs"
        aria-label="Button Back"
        onClick={() => router.back()}
      >
        <IconArrowLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
      <iframe
        src={`https://vidsrc.to/embed/movie/${params.id}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
}
