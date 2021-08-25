import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "yellow",
    padding: "10px 80px",

    color: "white",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
}));

const AppPagination = ({ setPage, pageNumber }) => {
  const classes = useStyles();
  //handle change
  const handleChange = page => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Pagination
          onChange={e => handleChange(e.target.textContent)}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          count={pageNumber}
        />
      </div>
    </div>
  );
};

export default AppPagination;
