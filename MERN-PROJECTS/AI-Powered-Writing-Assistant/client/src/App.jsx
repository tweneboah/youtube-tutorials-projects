import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Editor from "./Editor";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/write"
          element={
            <PrivateRoute>
              <Editor />
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
