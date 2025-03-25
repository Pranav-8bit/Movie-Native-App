export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}search/movie?query=${query}`
    : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();
  return data.results;
};

// const url =
//   "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWJhMDhkYmEzNzM1ZjA5Y2E0YWZmNzRjNTUyNmU4YyIsIm5iZiI6MTY2Mzk1NjIzOC4wNzksInN1YiI6IjYzMmRmNTBlZTEwZjQ2MDA3YTIwYjkzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7Q0VU4aRiR8k-n72scokuRNObnRWcNL5svUKFqP7MA",
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));
