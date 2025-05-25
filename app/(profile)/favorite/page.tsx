"use client";

import { AvatarSection } from "@/entities/user";
import { Header, Navbar } from "@/shared/layouts";
import { Box, Button, Flex, ScrollArea } from "@mantine/core";
import { IconStar, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const NAVBAR_OPTIONS = [
  {
    key: "profile",
    value: "Profile",
    icon: <IconUser size={20} />,
  },
  {
    key: "favorite",
    value: "Your favorite movies",
    icon: <IconStar size={20} />,
    active: true,
  },
];

export default function Favorite() {
  return (
    <ScrollArea>
      <Header
        leftSlot={
          <Button component={Link} href="/">
            All movies
          </Button>
        }
        text="Next example app | Favorite"
        rightSlot={<AvatarSection />}
      />
      <Flex h="calc(100vh - 60px)">
        <Navbar options={NAVBAR_OPTIONS} />
        <Box w="100%">Favorite</Box>
      </Flex>
    </ScrollArea>
  );
}
