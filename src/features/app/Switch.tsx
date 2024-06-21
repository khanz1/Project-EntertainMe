import { Switch, useMantineTheme, rem } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export enum PageType {
  MOVIE_TV = "movie-tv",
  MANGA = "manga",
}

export function SwitchSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageType = (searchParams.get("type") || PageType.MOVIE_TV) as PageType;

  // const sunIcon = (
  //   <IconSun
  //     style={{ width: rem(16), height: rem(16) }}
  //     stroke={2.5}
  //     color={theme.colors.yellow[4]}
  //   />
  // );

  // const moonIcon = (
  //   <IconMoonStars
  //     style={{ width: rem(16), height: rem(16) }}
  //     stroke={2.5}
  //     color={theme.colors.blue[6]}
  //   />
  // );

  useEffect(() => {
    if (!searchParams.get("type")) {
      const url = new URL(window.location.href);
      url.searchParams.set("type", pageType);
      router.push(url.toString());
    }
  }, [searchParams, pageType, router]);

  return (
    <Switch
      checked={pageType === PageType.MOVIE_TV}
      onChange={(e) => {
        const type = e.currentTarget.checked
          ? PageType.MOVIE_TV
          : PageType.MANGA;
        
        const url = new URL(window.location.href);
        url.searchParams.set("type", type);
        url.searchParams.set("page", "1");
        router.push(url.toString());
      }}
      size="xl"
      color="dark.4"
      onLabel={"Movie/TV"}
      offLabel={"Manga"}
    />
  );
}
