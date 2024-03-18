import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-post">Create Post</Link>
        </li>
        <li>
          <Link to="/lists">List Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
