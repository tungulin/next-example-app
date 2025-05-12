"use client";

import React from "react";

import { Box, List, rem } from "@mantine/core";

import classes from "./Navbar.module.css";
import { NAVBAR_OPTIONS } from "../constants";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Box p={rem(10)} className={classes.root}>
      <List className={classes.list} listStyleType="none">
        {NAVBAR_OPTIONS.map((option) => (
          <List.Item
            key={option.key}
            renderRoot={(props) => <Link href={option.key} {...props} />}
            className={classes.listItem}
            w={"100%"}
            h={40}
          >
            {option.value}
          </List.Item>
        ))}
      </List>
    </Box>
  );
};
