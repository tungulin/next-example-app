"use client";

import { ThemeButton } from "@/entities/theme";
import { Flex, rem, Title } from "@mantine/core";

import React from "react";

import classes from "./Header.module.css";

export const Header = () => {
  return (
    <Flex
      p={rem(10)}
      className={classes.root}
      justify="space-between"
      align="center"
    >
      <div />
      <Title order={2}>Example Next app</Title>
      <ThemeButton />
    </Flex>
  );
};
