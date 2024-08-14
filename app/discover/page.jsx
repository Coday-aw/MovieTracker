"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import Header from "@/components/header";
import { motion } from "framer-motion";
import Link from "next/link";

function Discover() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const [movies, setmovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");

  const getMovies = async () => {
    try {
      // API URLs
      const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
      const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
      const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

      // Fetch the data from all the URLs
      const [trendingRes, popularRes, upcomingRes, tvRes] = await Promise.all([
        fetch(trendingUrl),
        fetch(popularUrl),
        fetch(upcomingUrl),
      ]);

      // Get data from the responses
      const trendingData = await trendingRes.json();
      const popularData = await popularRes.json();
      const upcomingData = await upcomingRes.json();

      // Combine all data into one array
      const combinedMovies = [
        ...trendingData.results,
        ...popularData.results,
        ...upcomingData.results,
      ];

      // Remove movie duplicates by id
      const uniqueMovies = Array.from(
        new Map(combinedMovies.map((movie) => [movie.id, movie])).values()
      );
      // Set movies state
      setmovies(uniqueMovies);
      console.log(uniqueMovies);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setmovies([]);
    }
  };

  useEffect(() => {
    getMovies();
  }, [API_KEY]);

  // Handle search input
  const handleChange = (e) => {
    setSearchMovie(e.target.value);
  };
  // Filter movies based on search input
  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(searchMovie.toLowerCase())
  );

  return (
    <div>
      <Header />
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative sm:w-64 mb-5">
          <input
            className=" sm:w-full w-32 sm:px-8 sm:py-2 px-8 py-1 rounded-lg border-2 "
            type="text"
            placeholder="Search for movies"
            onChange={handleChange}
            value={searchMovie}
          />
          <SearchIcon
            size={18}
            className="absolute top-1/2 -translate-y-1/2 left-2"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMovies.map((movie) => {
            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <Link
                href={`/movie/${movie.id}`}
                className=" hover:scale-105 duration-300 ease-in-out cursor-pointer relative "
                key={movie.id}
              >
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="rounded-lg shadow-lg sm:w-[300px] sm:h-[400px] object-cover  "
                />
                <div className="flex flex-col justify-center items-center text-lg font-semibold mt-2 absolute bottom-0 right-0 text-center text-white bg-gray-900 w-full h-full opacity-0 hover:opacity-70 rounded-lg ">
                  <p>{movie.title || movie.name}</p>
                  <p>
                    {movie.release_date &&
                      new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default Discover;
