import React from "react";

import { Box, Container, Flex, List, rem, Stack, Title } from "@mantine/core";

import classes from "./Navbar.module.css";
import { ThemeButton } from "@/entities/theme";

export const Navbar = () => {
  return (
    <Box p={rem(10)} className={classes.root}>
      <List className={classes.list} listStyleType="none">
        <List.Item className={classes.listItem} w={"100%"} h={40}>
          Static Render
        </List.Item>
        <List.Item className={classes.listItem} w={"100%"} h={40}>
          Dynamic Render
        </List.Item>
        <List.Item className={classes.listItem} w={"100%"} h={40}>
          Streaming
        </List.Item>
      </List>
    </Box>
  );
};
