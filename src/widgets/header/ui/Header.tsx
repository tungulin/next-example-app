"use client";

import React from "react";
import { ThemeButton } from "@/features/toggle-theme";
import { Button, Flex, rem, Stack, Title } from "@mantine/core";

import { AuthModal } from "@/entities/user";

import classes from "./Header.module.css";
import { useDisclosure } from "@mantine/hooks";

export const Header = () => {
  const [openedAuthModal, { open: openAuthModal, close: closeAuthModal }] =
    useDisclosure(false);

  return (
    <Flex
      p={rem(10)}
      className={classes.root}
      justify="space-between"
      align="center"
    >
      <div />
      <Title order={2}>Example Next app</Title>

      <Flex align="center" gap="xl">
        <ThemeButton />
        <Button onClick={openAuthModal}>Auth</Button>
      </Flex>

      <AuthModal opened={openedAuthModal} onClose={closeAuthModal} />
    </Flex>
  );
};
