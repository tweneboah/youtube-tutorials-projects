import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  EmailShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const ModalContent = ({ id }) => {
  const [videoId, setVideoId] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}`
    );
    setVideoId(data?.results[0]?.key);
    setYoutubeLink(`https://www.youtube.com/watch?v=${data?.results[0]?.key}`);
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  console.log(videoId);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <YouTube videoId={videoId} opts={opts} />
      {/* Social Sharing */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <FacebookShareButton url={youtubeLink}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </div>

        <div style={{ marginRight: "10px" }}>
          <WhatsappShareButton url={youtubeLink}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>

        <div style={{ marginRight: "10px" }}>
          <EmailShareButton url={youtubeLink}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>

        <div style={{ marginRight: "10px" }}>
          <TwitterShareButton url={youtubeLink}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
