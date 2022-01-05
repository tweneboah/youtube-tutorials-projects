import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <section className="header-area header-one">
      <div className="header-content-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12">
              <div className="header-wrapper">
                <div className="header-content">
                  <h1 className="header-title news__title">
                    Best News at your finger tip
                  </h1>
                  <p className="text-lg">
                    The one place to get all the latest news and information
                    with just a click. News are updated every day to stay up to
                    date
                  </p>
                </div>
                {/* header content */}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="header-image d-none d-lg-block">
                <div className="image">
                  <img src="assets/images/homeHeader.svg" alt="Header" />
                </div>
              </div>
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
        <div className="header-shape">
          <img
            src="https://cdn.ayroui.com/1.0/images/header/header-shape.svg"
            alt="shape"
          />
        </div>
        {/* header-shape */}
      </div>
      {/* header content area */}
    </section>
  );
};

export default Header;
