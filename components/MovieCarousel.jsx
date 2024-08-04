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
import Link from "next/link";

function MovieCarousel({ movies }) {
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
          {movies.map((movie) => {
            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <CarouselItem key={movie.id}>
                <Card className="border-none">
                  <Link movies={movies} href={`/movie/${movie.id}`}>
                    <CardContent className="flex justify-center ">
                      <img
                        src={posterUrl}
                        alt="movie poster"
                        className="w-full h-full object-cover mt-5 relative"
                      />
                      <p className=" w-full text-center text-black font-bold text-2xl absolute bottom-6 opacity-100 bg-white">
                        {movie.title}
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
