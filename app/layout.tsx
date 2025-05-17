import { Box, ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import { cookies } from "next/headers";
import { THEME } from "@/shared/constants/default";
import { Theme } from "@/features/toggle-theme";
import { Inter } from "next/font/google";
import { Providers } from "@/app";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles/ScrollArea.css";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
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
import "@mantine/core/styles/PasswordInput.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/FloatingIndicator.css";
import "@mantine/core/styles/Text.css";
import "@mantine/core/styles/ActionIcon.css";
import "@mantine/core/styles/Pagination.css";
import "@mantine/core/styles/Stack.css";
import "@mantine/core/styles/Grid.css";
import "@mantine/core/styles/Badge.css";
import "@mantine/core/styles/Skeleton.css";
import "@mantine/core/styles/Center.css";
import "@mantine/core/styles/Modal.css";
import "@mantine/carousel/styles.css";

export const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get(THEME)?.value as Theme) || Theme.LIGHT;

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript forceColorScheme={theme} />
      </head>
      <body>
        <Providers>
          <Box className={inter.className}>{children}</Box>
        </Providers>
      </body>
    </html>
  );
}
