const API_KEY = "fe28e7401d263d4b5338e9fe8fb8639e";

const getMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
};
export { getMovies };
