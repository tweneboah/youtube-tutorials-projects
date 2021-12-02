import { Typography } from "@mui/material";
import Search from "./component/Search";
import AppsIcon from "@mui/icons-material/Apps";
import { Box } from "@mui/system";

function App() {
  return (
    <>
      {/* Navbar */}
      <Box sx={{ flexContent: "flex-end" }}>
        <Box>
          <Typography>Gmail</Typography>
          <Typography>Images</Typography>
          <AppsIcon />
        </Box>
      </Box>
    </>
  );
}

export default App;
