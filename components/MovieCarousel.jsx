"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Heading from "./Heading";
import Link from "next/link";

function MovieCarousel() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [topMovies, setTopMovies] = useState([]);

  const getTopMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setTopMovies(data.results);
  };

  useEffect(() => {
    getTopMovies();
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <Carousel
        className="max-w-[500px] sm:max-w-[600px] lg:max-w-[700px] "
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {topMovies.map((topMovie) => {
            const posterUrl = `https://image.tmdb.org/t/p/w500${topMovie.backdrop_path}`;
            return (
              <CarouselItem key={topMovie.id}>
                <Card className="border-none">
                  <Link href={`/movie/${topMovie.id}`}>
                    <CardContent className="flex justify-center ">
                      <img
                        src={posterUrl}
                        alt="movie poster"
                        className="w-full h-full object-cover mt-5 relative"
                      />
                      <p className=" w-full text-center text-black font-bold text-2xl absolute bottom-6 opacity-100 bg-white">
                        {topMovie.title}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.section>
  );
}
export default MovieCarousel;
