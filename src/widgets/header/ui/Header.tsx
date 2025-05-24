"use client";

import React, { useEffect, useState } from "react";
import { ThemeButton } from "@/features/toggle-theme";
import { Avatar, Flex, rem, Title } from "@mantine/core";

import { AuthModal, RegistryModal } from "@/entities/user";

import classes from "./Header.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useUnmount } from "@/shared/hooks";

export const Header = () => {
  const [openedAuthModal, { open: openAuthModal, close: closeAuthModal }] =
    useDisclosure(false);

  const [isAuthModal, setIsAuthModal] = useState(true);

  useUnmount(() => {
    setIsAuthModal(true);
  });

  const handleToggleTypeModal = () => setIsAuthModal(!isAuthModal);

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
        <Avatar
          className={classes.avatar}
          onClick={openAuthModal}
          radius="xl"
        />
      </Flex>
      {isAuthModal ? (
        <AuthModal
          opened={openedAuthModal}
          onClose={closeAuthModal}
          onClickRegistry={handleToggleTypeModal}
        />
      ) : (
        <RegistryModal
          opened={openedAuthModal}
          onClose={closeAuthModal}
          onClickAuth={handleToggleTypeModal}
        />
      )}
    </Flex>
  );
};
