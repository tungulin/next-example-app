"use client";

import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconSun, IconSunFilled } from "@tabler/icons-react";
import { Theme } from "../types";
import { setCookie, useCookiesNext } from "cookies-next";
import { THEME } from "@/shared/constants/default";
import { useRouter } from "next/navigation";

import { notifications } from "@mantine/notifications";

export const ThemeButton = () => {
  const router = useRouter();
  const cookies = useCookiesNext();
  const theme = cookies.getCookie(THEME) || "light";

  const handleToggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setCookie(THEME, newTheme, {
      maxAge: 60 * 60 * 24 * 30,
    });

    router.refresh();
  };

  return (
    <ActionIcon variant="default" onClick={handleToggleTheme}>
      {theme === Theme.LIGHT ? <IconSun /> : <IconSunFilled />}
    </ActionIcon>
  );
};
