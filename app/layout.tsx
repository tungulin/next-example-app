import { Box, ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import { cookies } from "next/headers";
import { THEME } from "@/shared/constants/default";
import { Theme } from "@/features/toggle-theme";
import { Inter } from "next/font/google";
import { Providers } from "@/app";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
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
          <Box className={inter.className}>
            {children}
            <Notifications />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
