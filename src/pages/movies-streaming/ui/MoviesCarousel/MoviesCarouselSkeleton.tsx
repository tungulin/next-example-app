import { Carousel } from "@mantine/carousel";
import React from "react";
import classes from "./MoviesCarousel.module.css";
import { Skeleton } from "@mantine/core";
import { arrayFromNumber } from "@/shared/libs/array";

export const MoviesCarouselSkeleton = () => {
  return (
    <Carousel
      className={classes.carousel}
      withIndicators
      height={200}
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      loop
      align="start"
      slidesToScroll={3}
    >
      {arrayFromNumber(10).map((key) => (
        <Carousel.Slide key={key} className={classes.slide}>
          <Skeleton className={classes.slideSkeleton} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
