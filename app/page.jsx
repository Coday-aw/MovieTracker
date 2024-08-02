"use client";

import { useEffect, useState } from "react";
import MovieCarousel from "@/components/MovieCarousel";
import Header from "@/components/header";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");

  const getMovies = async (url, setMovies) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    }
  };

  const handleChange = (e) => {
    setSearchMovie(e.target.value);
  };

  const filteredTrendingMovies = trendingMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  const filteredTopRatedMovies = topRatedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  const filteredUpcomingMovies = upcomingMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  useEffect(() => {
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
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header handleChange={handleChange} searchMovie={searchMovie} />
      <MovieCarousel />
      <MovieCard movies={filteredTrendingMovies} heading="Trending" />
      <MovieCard movies={filteredTopRatedMovies} heading="Top Rated" />
      <MovieCard movies={filteredUpcomingMovies} heading="Upcoming" />
    </div>
  );
}
