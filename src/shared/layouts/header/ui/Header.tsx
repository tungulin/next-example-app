"use client";

import React, { ReactNode } from "react";
import { ThemeButton } from "@/features/toggle-theme";
import { Flex, rem, Title } from "@mantine/core";

import classes from "./Header.module.css";
import { useRouter } from "next/navigation";

interface Props {
  rightSlot?: ReactNode;
}

export const Header = ({ rightSlot }: Props) => {
  const router = useRouter();

  const hadnleClickCenter = () => router.push("/");

  return (
    <Flex
      p={rem(10)}
      className={classes.root}
      justify="space-between"
      align="center"
    >
      <div />
      <Title
        style={{ cursor: "pointer" }}
        onClick={hadnleClickCenter}
        order={2}
      >
        Example Next app
      </Title>

      <Flex align="center" gap="xl">
        <ThemeButton />
        {rightSlot}
      </Flex>
    </Flex>
  );
};
