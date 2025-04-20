import { useClientRedirect } from "@/shared/hooks";
import React from "react";

export default function Page() {
  useClientRedirect("/movies-ssr", { query: { page: 1 } });

  return <></>;
}
