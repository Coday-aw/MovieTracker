"use client";

import { useEffect, useState } from "react";
import MovieCarousel from "@/components/MovieCarousel";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/header";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const getMovies = async (url, setMovies) => {
    // Fetch movies from the API and set the state
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    // Fetch movies when the component mounts
    getMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      setTrendingMovies
    );
    getMovies(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
      setTopRatedMovies
    );

    getMovies(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
      setUpcomingMovies
    );
  }, [API_KEY]);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <MovieCarousel movies={topRatedMovies} />
      <MovieCard movies={trendingMovies} heading="Trending" />
      <MovieCard movies={topRatedMovies} heading="Top Rated" />
      <MovieCard movies={upcomingMovies} heading="Upcoming" />
    </div>
  );
}
