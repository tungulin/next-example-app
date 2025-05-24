"use client";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegistryModal } from "./RegistryModal";
import { Avatar } from "@mantine/core";
import { useUser } from "../model/store";

export const AvatarSection = () => {
  const user = useUser();
  const [isAuthModal, setIsAuthModal] = useState(true);
  const [openedAuthModal, { open: openAuthModal, close: closeAuthModal }] =
    useDisclosure(false);

  const handleToggleTypeModal = () => setIsAuthModal(!isAuthModal);

  return (
    <>
      {user ? (
        <div>{user.login}</div>
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
