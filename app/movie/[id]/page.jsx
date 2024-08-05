"use client";

import Header from "@/components/header";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

function MovieDetails({ params }) {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    // Fetch movie by ID
    const getMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovie(data);
    };
    // Fetch trailer by ID
    const getTrailer = async () => {
      const url = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const trailer = data.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    };

    getMovie();
    getTrailer();
  }, [params.id, API_KEY]);

  // get the poster
  const posterUrl = movie ? (
    `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
  ) : (
    <Skeleton width={300} height={500} />
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <Header />
      <motion.div className="flex justify-between sm:flex-row flex-col max-w-[1000px] p-5 gap-6 ">
        {movie ? (
          <img
            src={posterUrl}
            alt="movie poster"
            className="sm:w-[300px] sm:h-[500px] object-cover rounded-lg"
          />
        ) : (
          <Skeleton width={300} height={500} />
        )}
        <div className="flex-1 sm:mt-5">
          <p className="text-3xl font-bold mb-5">
            {movie ? movie.title || movie.name : <Skeleton width={200} />}
          </p>
          <p className="mb-4 font-medium text-xl">
            {movie ? movie.overview : <Skeleton count={3} />}
          </p>
          <div className="flex gap-1 font-bold text-xl justify-start items-center mb-4">
            <FaStar className="text-yellow-500" />
            {movie ? movie.vote_average?.toFixed(1) : <Skeleton width={50} />}
          </div>
          <p className="font-bold text-xl ">
            {movie ? (
              `Release Date: ${movie.release_date || movie.first_air_date}`
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <div className="mt-6 text-xl font-bold">
            {movie && movie.genres ? (
              movie.genres.map((genre) => genre.name).join(", ")
            ) : (
              <Skeleton width={150} />
            )}
          </div>
        </div>
      </motion.div>

      {trailerUrl ? (
        <div className=" flex justify-center items-center w-full mt-20 mb-20">
          <iframe
            width="90%"
            height="500"
            src={trailerUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <Skeleton width={560} height={315} />
      )}
    </motion.section>
  );
}

export default MovieDetails;
