import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import Banner from "./Banner";
import { movieClient } from "../config/movieClient";

console.log("before useEffect");
const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const mount = useRef(false);
  let pageIndex = 2;
  useEffect(() => {
    console.log(mount.current);
    if (!mount.current) {
      console.log("In useEffect");
      const fetch = async () => {
        try {
          const mData = [];
          //loop
          //   for (let pageIndex = 1; pageIndex <= 40; pageIndex++) {
          const response = await movieClient.get(`/movie/${565770}/videos`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN}`,
            },
          });
          console.log(response.data);
          mData.push(...response.data.results);
          //   }
          setMovieData(mData);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetch();
    }
    mount.current = true;
  }, []);
  console.log("UserEffet");

  return (
    <div>
      <Nav />
      <Banner />
    </div>
  );
};

export default Movies;

// <h1>Movie Data</h1>
// <ul>
//   {movieData.map((movie) => (
//     <li key={movie.id}>
//       <div>
//         <h2>{movie.title}</h2>
//         <p>Overview: {movie.overview}</p>
//         <p>Release Date: {movie.release_date}</p>
//         <p>ID: {movie.id}</p>
//         <p>{movie.poster_path}</p>
//         {/* Add more properties here */}
//         <img
//           src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//         />
//       </div>
//     </li>
//   ))}
// </ul>

//

//   `https://api.themoviedb.org/3/movie/10?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`

// MOVIES BROWSER
// `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageIndex}&sort_by=popularity.desc`
