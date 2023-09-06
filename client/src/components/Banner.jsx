import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ListIcon from "@mui/icons-material/List";
import { request } from "../config/Request";
import { movieClient } from "../config/movieClient";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await movieClient.get(request.fetchTrendingMovies, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN}`,
        },
      });
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    };
    fetchMovieData();
  }, []);

  console.log(movie);
  const truncatedDescription = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="Banner "
      style={{
        position: "relative",
        height: "600px",
        backgroundSize: "cover",
        objectFit: "contain",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="ml-20 pt-56  text-white">
        <h1 className="movie-title text-5xl font-bold ">
          {movie?.original_title}
        </h1>
        <div className="pt-4 flex ">
          <button
            className=" bg-white hover:bg-[#C0C2C2] px-5 py-1 mr-4 rounded-[4px] text-black flex items-center shadow-md transition-all"
            type="button"
          >
            <PlayArrowIcon
              elevation={0}
              style={{ filter: "none", fontSize: 38 }}
            />
            <span className="font-semibold text-xl text-black">Play</span>
          </button>
          <button
            className="bg-white shadow-md hover:bg-[#C0C2C2]   px-5 py-1 rounded-[4px] text-black flex items-center transition-all"
            type="button"
          >
            <ListIcon style={{ filter: "none", fontSize: 29 }} />
            <span className="font-semibold text-xl text-black">My List</span>
          </button>
        </div>
        <div className="w-[32.5rem] leading-loose  pt-2">
          <h1 className="description text-lg leading-[1.5rem] ">
            {truncatedDescription(`${movie?.overview}`, 150)}
          </h1>
        </div>
      </div>

      <div className="fade-bottom absolute bottom-0 left-0 right-0" />
    </header>
  );
};

export default Banner;
