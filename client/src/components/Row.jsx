import React, { useEffect, useState } from "react";
import { movieClient } from "../config/movieClient";
import Skeleton from "./skeleton/Skeleton";

const Row = ({ title, fetchURL}) => {
  const [movies, setMovies] = useState([]);
  const [loadedImage, setLoadedImage] = useState(true); 
  const [loadedImages, setLoadedImages] = useState([]); 
  const baseImageURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieClient.get(fetchURL, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN}`,
          },
        });
        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovie();
  }, [fetchURL]);
 
const loadedImagesArray = [];
  useEffect(() => {
    movies.forEach((movie) => {
      const img = new Image();
      img.src = `${baseImageURL}${movie.poster_path}`;
      img.onload = () => {
        console.log("Loaded content")
        setLoadedImage(false)
        loadedImagesArray.push(img.src);
        setLoadedImages([...loadedImagesArray]);
      };
    });
  }, [movies]);

  return (
    <div className="row ml-14">
      <h1 className="text-white font-semibold text-[1.75rem] leading-10">
        {title}
      </h1>
      <div className="row-posters flex overflow-y-hidden overflow-x-scroll p-8 ">
        
      {loadedImage ? (
          <Skeleton value={8}/>
        ) : (
          movies.map((movie) => (
            <img
              className="row-poster-image mx-1 rounded-[5px] max-h-[16rem]"
              key={movie.id}
              src={loadedImages.includes(`${baseImageURL}${movie.poster_path}`) ? `${baseImageURL}${movie.poster_path}` : <Skeleton/>}
              alt={movie.name}
            />
          ))
        )}
       
      </div>
    </div>
  );
};

export default Row;
