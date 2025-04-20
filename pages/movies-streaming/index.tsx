import {
  MoviesCarousel,
  MoviesCarouselSkeleton,
} from "@/pages/movies-streaming";
import { Navbar } from "@/widgets/navbar";
import { ScrollArea } from "@mantine/core";
import React, { Suspense } from "react";

export const getServerSideProps = async (context: any) => {
  return { props: {} };
};

export default function Page() {
  return (
    <>
      <Navbar />
      <ScrollArea w="75%" type="scroll">
        <Suspense fallback={<MoviesCarouselSkeleton />}>
          <MoviesCarousel disabled movies={[]} />
        </Suspense>
      </ScrollArea>
    </>
  );
}
