"use client";

import { useClickOutside, useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegistryModal } from "./RegistryModal";
import { Avatar, Flex, NavLink, Popover, Stack, Text } from "@mantine/core";
import { useUser, useUserActions } from "../../model/store";

import classes from "./AvatarSection.module.css";
import Link from "next/link";
import { useCookiesNext } from "cookies-next";
import { AUTH_TOKEN } from "@/shared/constants/default";
import { useRouter } from "next/navigation";

export const AvatarSection = () => {
  const user = useUser();
  const { clearUser } = useUserActions();
  const [isAuthModal, setIsAuthModal] = useState(true);
  const cookies = useCookiesNext();
  const router = useRouter();

  const [openedAuthModal, { open: openAuthModal, close: closeAuthModal }] =
    useDisclosure(false);

  const [openedPopover, { close: closePopover, toggle: tooglePopover }] =
    useDisclosure(false);

  const handleToggleTypeModal = () => setIsAuthModal(!isAuthModal);

  const popoverRef = useClickOutside(closePopover);

  const handleLogout = () => {
    cookies.deleteCookie(AUTH_TOKEN);
    clearUser();
    router.push("/");
  };

  return (
    <>
      {user ? (
        <Popover opened={openedPopover} position="bottom" shadow="sm">
          <Popover.Target>
            <Text style={{ cursor: "pointer" }} onClick={tooglePopover}>
              {user.login || "NO-NAME"}
            </Text>
          </Popover.Target>
          <Popover.Dropdown ref={popoverRef}>
            <Stack gap="md">
              <NavLink
                w="250"
                component={Link}
                href="/profile"
                label="Profile"
              />
              <NavLink w="250" label="Logout" onClick={handleLogout} />
            </Stack>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={openAuthModal}
          radius="xl"
        />
      )}
      {isAuthModal ? (
        <LoginModal
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
    </>
  );
};
