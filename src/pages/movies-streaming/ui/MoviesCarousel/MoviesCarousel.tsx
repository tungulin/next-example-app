import { Carousel } from "@mantine/carousel";
import React from "react";
import classes from "./MoviesCarousel.module.css";
import { Movie } from "@/entities/movie";

export type MoviesCarouselProps = {
  disabled?: boolean;
  movies: Movie[];
};

export const MoviesCarousel = (props: MoviesCarouselProps) => {
  const { movies = [], disabled = false } = props;

  return (
    !disabled && (
      <Carousel
        className={classes.carousel}
        withIndicators
        height={200}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        loop
        align="start"
        slidesToScroll={3}
      >
        {movies.map((movie) => (
          <Carousel.Slide key={movie.title} className={classes.slide}>
            1
          </Carousel.Slide>
        ))}
      </Carousel>
    )
  );
};
