import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div>
      <section className="navbar-area navbar-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                  <i class="lni lni-opera h5 text-warning"></i>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarOne"
                  aria-controls="navbarOne"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarOne"
                >
                  <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                      <Link to="/trump-news">Trump News</Link>
                    </li>
                    <li className="nav-item">
                      <a href="/techcrunch-news">TechCrunch News</a>
                    </li>
                    <li className="nav-item">
                      <a href="/bitcoin-news">Bitcon News</a>
                    </li>
                    <li className="nav-item">
                      <a href="/bbc-news">BBC News</a>
                    </li>
                  </ul>
                </div>
                <div className="navbar-btn d-none d-sm-inline-block">
                  <ul>
                    <li>
                      <a className="btn primary-btn-outline" href="/">
                        Advertisement
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* navbar */}
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
      </section>
    </div>
  );
};

export default Navbar;
