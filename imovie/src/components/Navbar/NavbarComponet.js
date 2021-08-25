import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import DrawerComponent from "./DrawerComponent";

//customise component
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  openDrawer: {
    marginLeft: "auto",
    cursor: "pointer",
  },
}));

const NavbarComponet = () => {
  //css
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [value, setValue] = useState(0);
  //theme customisation
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  //history
  const history = useHistory();

  //handle change
  const handleChange = (e, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  //Routing

  useEffect(() => {
    if (value === 0) history.push("/");
    if (value === 1) history.push("/trending");
    if (value === 2) history.push("/series");
  }, [value]);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <LiveTvIcon />
          </IconButton>

          {/* Tabs */}
          {!isMatch && (
            <Tabs value={value} onChange={handleChange}>
              <Tab icon={<LiveTvIcon />} label="Movies" />
              <Tab icon={<TrendingUpIcon />} label="Trending" />
              <Tab icon={<LocalMoviesIcon />} label="TV Series" />
            </Tabs>
          )}

          <MenuIcon onClick={setOpenDrawer} className={classes.openDrawer} />
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      {isMatch && (
        <DrawerComponent
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      )}
    </>
  );
};

export default NavbarComponet;
