import React from "react";
import { ThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import theme from "./utils/theme";

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
