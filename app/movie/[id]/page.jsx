"use client";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MovieDetails({ params }) {
  const [movie, setMovie] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const getMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovie(data);
    };
    getMovie();
  }, [params.id, API_KEY]);

  const posterUrl = movie
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : null;

  return (
    <section className="flex justify-between sm:flex-row flex-col max-w-[1000px] p-5 gap-5 ">
      {movie ? (
        <img
          src={posterUrl}
          alt="movie poster"
          className="sm:w-[300px] sm:h-[500px] object-cover rounded-lg"
        />
      ) : (
        <Skeleton width={300} height={500} />
      )}
      <div className="flex-1">
        <p className="text-2xl font-bold mb-5">
          {movie ? movie.title : <Skeleton width={200} />}
        </p>
        <p className="mb-4 font-medium text-xl">
          {movie ? movie.overview : <Skeleton count={3} />}
        </p>
        <div className="flex gap-1 font-bold text-xl justify-start items-center mb-4">
          <FaStar className="text-yellow-500" />
          {movie ? movie.vote_average.toFixed(1) : <Skeleton width={50} />}
        </div>
        <p>
          {movie ? (
            `Release Date: ${movie.release_date}`
          ) : (
            <Skeleton width={150} />
          )}
        </p>
      </div>
    </section>
  );
}

export default MovieDetails;
