import type { AppProps } from "next/app";
import { Box, Flex, MantineProvider, rem } from "@mantine/core";

import { themeConfig } from "@/app";
import { useThemeStore } from "@/entities/theme";
import { Header, Navbar } from "@/pages/root";

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
import "@mantine/core/styles/ActionIcon.css";

export default function App({ Component, pageProps }: AppProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <MantineProvider theme={themeConfig} forceColorScheme={theme}>
      <Box style={{ height: "100vh" }}>
        <Header />
        <Flex style={{ height: "calc(100% - 60px)" }}>
          <Navbar />
          <Box p={rem(10)} style={{ width: "75%" }}>
            <Component {...pageProps} />
          </Box>
        </Flex>
      </Box>
    </MantineProvider>
  );
}
