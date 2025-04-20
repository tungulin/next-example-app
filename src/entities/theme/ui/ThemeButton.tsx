import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconSun, IconSunFilled } from "@tabler/icons-react";
import { Theme, useThemeActions, useThemeStore } from "../model/store";
import { themeLocalStorage } from "@/shared/localStorage";
import { setCookie } from "cookies-next";
// import Cookies from "js-cookie";

export const ThemeButton = () => {
  const theme = useThemeStore((state) => state.theme);
  const { onToggleTheme } = useThemeActions();

  const handleToggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    onToggleTheme();
    setCookie("theme", newTheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <ActionIcon variant="default" onClick={handleToggleTheme}>
      {theme === Theme.LIGHT ? <IconSun /> : <IconSunFilled />}
    </ActionIcon>
  );
};
