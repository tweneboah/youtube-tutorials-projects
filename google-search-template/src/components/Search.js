import React from "react";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const Search = () => {
  return (
    <>
      {/* Navbar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", mr: 4, pt: 2 }}>
          <Typography>Gmail</Typography>
          <Typography sx={{ mr: 4, ml: 2 }}>Images</Typography>
          <AppsIcon />
        </Box>
      </Box>

      {/* Main container */}

      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* img */}
        <Box component="img" src="images/google.png" />
        {/* Input */}
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            pr: 2,
            pl: 2,
            ml: 2,
            borderRadius: "10px",
          }}
        >
          {/* icon left */}
          <SearchIcon />
          {/* input */}
          <Box
            component="input"
            sx={{
              flex: 1,
              pt: 2,
              pb: 1,
              border: "none",
              "&:focus": {
                outline: "none",
              },
            }}
          />
          {/* icon right */}
          <Box
            sx={{ width: "20px" }}
            component="img"
            src="images/google_mic.png"
          />
        </Box>
        {/* Buttons */}

        <Box sx={{ m: 3 }}>
          <Button
            sx={{
              mr: 2,
              width: "200px",
              p: 1,
              border: "1px solid gray",
              color: "gray",
            }}
            type="submit"
          >
            Search
          </Button>

          <Button
            sx={{
              mr: 2,
              width: "200px",
              p: 1,
              border: "1px solid gray",
              color: "gray",
            }}
            type="submit"
          >
            Feeling good
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Search;
