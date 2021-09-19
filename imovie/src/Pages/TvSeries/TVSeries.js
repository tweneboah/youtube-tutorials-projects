import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import ContentDetails from "../../components/ContentDetails/ContentDetails";
import AppPagination from "../../components/Pagination/AppPagination";
import Genres from "../../components/Genres/Genres";
import genresIDs from "../../utils/genresIDs";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import ErrorComponent from "../../components/Errors/ErrorComponent";

const TVSeries = () => {
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(9);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genresIds = genresIDs(selectedGenres);

  //FETCH MOVIES
  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genresIds}
        `
      );
      setMovies(data?.results);
      setLoading(false);
      setNumberOfPages(data?.total_pages);
    } catch (error) {
      setIsErr(true);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, selectedGenres]);

  return (
    <>
      {/* Genres */}
      {loading ? (
        <LoadingComponent />
      ) : isErr ? (
        <ErrorComponent />
      ) : (
        <>
          <Genres
            page={page}
            genres={genres}
            setGenres={setGenres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <Grid container direction="row" justify="center" alignItems="center">
            {movies?.map(movie => (
              <Grid item md={6}>
                <ContentDetails movie={movie} />
              </Grid>
            ))}
          </Grid>
          <AppPagination setPage={setPage} pageNumber={numberOfPages} />
        </>
      )}
    </>
  );
};

export default TVSeries;
