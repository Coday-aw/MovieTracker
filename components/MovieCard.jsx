"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Heading from "./Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow } from "./NextSlideBtn";
import { PrevArrow } from "./PrevSlideBtn";

const MovieCard = ({ movies, heading }) => {
  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // Responsive breakpoints
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <motion.section
      className="container mx-auto px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <Heading>{heading}</Heading>
      <Slider {...settings}>
        {movies.map((movie) => {
          const posterUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
          return (
            <div
              className="px-2 mt-10  hover:scale-105 duration-300 ease-in-out cursor-pointer"
              key={movie.id}
            >
              <Link
                href={`/movie/${movie.id}`}
                className="block h-[300px] border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              <p className=" text-center font-bold ">{movie.title}</p>
            </div>
          );
        })}
      </Slider>
    </motion.section>
  );
};

export default MovieCard;
