import React, { useState, useEffect } from "react";
import { Chip } from "@material-ui/core";
import axios from "axios";

const Genres = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  page,
}) => {
  console.log(genres);
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
    );
    setGenres(data?.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, [page]);

  //handle add
  const handleAddGenres = genre => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres?.filter(g => g?.id !== genre?.id));
  };

  //handle add
  const handleRemoveGenres = genre => {
    setSelectedGenres(
      selectedGenres?.filter(selected => selected?.id !== genre?.id)
    );
    setGenres([...genres, genre]);
  };

  return (
    <div style={{ padding: "10px 0" }}>
      {selectedGenres?.map(genre => (
        <Chip
          onDelete={() => handleRemoveGenres(genre)}
          style={{ backgroundColor: "#adb5bd" }}
          clickable
          label={genre?.name}
        />
      ))}
      {genres?.map(genre => (
        <Chip
          onClick={() => handleAddGenres(genre)}
          clickable
          style={{ fontSize: "1.2em", margin: "3px" }}
          label={genre?.name}
          color="secondary"
        />
      ))}
    </div>
  );
};

export default Genres;
