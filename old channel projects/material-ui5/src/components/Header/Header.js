import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "url(images/header.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "80vh",
          ml: 3,
        }}
      >
        <Typography
          sx={{ fontFamily: "cursive", fontWeight: "bold", color: "#f8bbd0" }}
          variant="h2"
        >
          Find Your New Favorite
        </Typography>

        <Typography
          sx={{ fontFamily: "cursive", fontWeight: "bold", color: "#f8bbd0" }}
          variant="h3"
        >
          Collection at Winter
        </Typography>

        <Typography
          sx={{ fontFamily: "cursive", fontWeight: "bold", color: "#f8bbd0" }}
          variant="h4"
        >
          sale 2022
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
