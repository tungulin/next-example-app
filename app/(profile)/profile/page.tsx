import { AvatarSection } from "@/entities/user";
import { Header } from "@/shared/layouts";
import { ScrollArea } from "@mantine/core";
import React from "react";

export default function Profile() {
  return (
    <ScrollArea>
      <Header rightSlot={<AvatarSection />} />
    </ScrollArea>
  );
}
