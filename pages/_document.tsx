import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
