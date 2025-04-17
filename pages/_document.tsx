import { mantineHtmlProps } from "@mantine/core";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// style={{ overflow: "hidden" }}
