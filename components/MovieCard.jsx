"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Heading from "./Heading";

const MovieCard = ({ movies, heading }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <Heading>{heading}</Heading>
      <div className="flex flex-wrap justify-center gap-4 max-w-[1000px] mt-4">
        {movies.map((movie) => {
          const posterUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
          return (
            <Link
              href={`/movie/${movie.id}`}
              className="border w-[200px] h-[300px] rounded-lg relative mb-5 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              key={movie.id}
            >
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg "
              />
              <div className="absolute bottom-0 bg-slate-900 w-full h-full text-center flex justify-center flex-col opacity-0 hover:opacity-80 text-white transition-opacity duration-300 ease-in-out rounded-lg">
                <p className="font-bold mt-1">{movie.title}</p>
                <p>{new Date(movie.release_date).getFullYear()}</p>
              </div>

              <p className="absolute bottom-[-8px] right-[-8px] bg-yellow-300 p-1 rounded-full font-bold">
                {movie.vote_average.toFixed(1)}
              </p>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
};
export default MovieCard;
