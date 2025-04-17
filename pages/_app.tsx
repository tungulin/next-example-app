import type { AppProps } from "next/app";
import {
  Box,
  Flex,
  MantineProvider,
  Pagination,
  rem,
  ScrollArea,
} from "@mantine/core";

import { themeConfig } from "@/app";
import { Theme, useThemeActions, useThemeStore } from "@/entities/theme";
import { Header, Navbar } from "@/pages/root";
import { Inter } from "next/font/google";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles/ScrollArea.css";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/VisuallyHidden.css";
import "@mantine/core/styles/Paper.css";
import "@mantine/core/styles/Popover.css";
import "@mantine/core/styles/CloseButton.css";
import "@mantine/core/styles/Group.css";
import "@mantine/core/styles/Loader.css";
import "@mantine/core/styles/Overlay.css";
import "@mantine/core/styles/ModalBase.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/InlineInput.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/FloatingIndicator.css";
import "@mantine/core/styles/Text.css";
import "@mantine/core/styles/ActionIcon.css";
import "@mantine/core/styles/Pagination.css";
import "@mantine/core/styles/Stack.css";
import "@mantine/core/styles/Grid.css";
import "@mantine/core/styles/Badge.css";
import { themeLocalStorage } from "@/shared/localStorage";
import { useEffect } from "react";

export const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const theme = useThemeStore((state) => state.theme);
  const { initTheme } = useThemeActions();

  return (
    <MantineProvider theme={themeConfig} forceColorScheme={theme}>
      <Box className={inter.className} style={{ height: "100vh" }}>
        <Header />
        <Flex style={{ height: "calc(100% - 60px)" }}>
          <Navbar />
          <ScrollArea w="75%" type="scroll">
            <Box p={10}>
              <Component {...pageProps} />
            </Box>
          </ScrollArea>
        </Flex>
      </Box>
    </MantineProvider>
  );
}
