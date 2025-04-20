import type { AppContext, AppProps } from "next/app";
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
import { Header } from "@/widgets/header";
import { getCookie } from "cookies-next";

import { Inter } from "next/font/google";
import { useLayoutEffect } from "react";

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
import "@mantine/core/styles/Skeleton.css";
import "@mantine/carousel/styles.css";

export const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps, theme }: AppProps & { theme: Theme }) {
  const updatedTheme = useThemeStore((state) => state.theme);
  const { initTheme } = useThemeActions();

  useLayoutEffect(() => {
    if (theme) {
      initTheme(theme);
    }
  }, [theme]);

  return (
    <MantineProvider
      theme={themeConfig}
      defaultColorScheme={theme}
      forceColorScheme={updatedTheme}
    >
      <Box className={inter.className} style={{ height: "100vh" }}>
        <Header />
        <Flex style={{ height: "calc(100% - 60px)" }}>
          <Component {...pageProps} />
        </Flex>
      </Box>
    </MantineProvider>
  );
}

App.getInitialProps = async ({ ctx }: AppContext) => ({
  theme: await getCookie("theme", ctx),
});

export default App;
