import { Switch, useMantineTheme, rem } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function SwitchSearch() {
  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch size="md" color="dark.4" onLabel={"Manga"} offLabel={"Movie/TV"} />
  );
}
