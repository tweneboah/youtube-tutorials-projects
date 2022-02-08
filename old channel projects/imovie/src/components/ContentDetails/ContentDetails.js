import React from "react";
import { Button } from "@material-ui/core";
import { img500x500 } from "../../utils/imageLink";
import AppModal from "../Modal/AppModal";

const ContentDetails = ({ movie }) => {
  const movieID = movie?.id;
  return (
    <div class="movie_card" id="bright">
      <div class="info_section">
        <div class="movie_header">
          <img class="locandina" src={`${img500x500}/${movie?.poster_path}`} />
          <h1>{movie?.title}</h1>
          <h4>{movie?.release_date}</h4>
          <span class="minutes">{movie?.vote_average}</span>
          <p class="type">{movie?.original_title}</p>
        </div>
        <div class="movie_desc">
          <p class="text">{movie?.overview}</p>
        </div>
        <div
          style={{
            display: "flex",
            margin: "5px",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ margin: "5px" }}>
            <AppModal id={movieID}>
              <li>
                <Button variant="outlined" color="secondary">
                  Watch Trailer
                </Button>
              </li>
            </AppModal>
          </div>
        </div>
      </div>
      <div class="blur_back bright_back">
        <img src={`${img500x500}/${movie?.backdrop_path}`} />
      </div>
    </div>
  );
};

export default ContentDetails;
