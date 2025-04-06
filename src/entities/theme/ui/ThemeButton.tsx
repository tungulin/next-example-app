import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconSun, IconSunFilled } from "@tabler/icons-react";
import { Theme, useThemeStore } from "../model/store";

export const ThemeButton = () => {
  const theme = useThemeStore((state) => state.theme);
  const onToggleTheme = useThemeStore((state) => state.onToggleTheme);

  return (
    <ActionIcon variant="default" onClick={onToggleTheme}>
      {theme === Theme.LIGHT ? <IconSun /> : <IconSunFilled />}
    </ActionIcon>
  );
};
