import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/data.svg";
const Home = () => {
  return (
    <>
      <section className="position-relative pb-5">
        <img
          className="d-none d-lg-block position-absolute top-0 start-0 bottom-0 w-50 h-100 img-fluid "
          style={{ objectFit: "cover" }}
          src={bg}
          alt=""
        />
        <div className="position-relative">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-lg-5 ms-auto">
                <div className="mb-5">
                  <h2 className="display-4 fw-bold mb-5">
                    Keep Track of Your Income & Expenses
                  </h2>
                  <p className="lead text-muted mb-5">
                    View all your income and expenses flow from your team in one
                    dashboard
                  </p>
                  <div className="d-flex flex-wrap">
                    <Link
                      to="/profile"
                      className="btn btn-primary me-2 mb-2 mb-sm-0"
                    >
                      Track your performance
                    </Link>
                    <a
                      target="_blank"
                      className="btn btn-secondary mb-2 mb-sm-0"
                      href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
                    >
                      Video Tutorial
                    </a>
                  </div>
                </div>
                <h1 className="text-danger">Admin Login </h1>
                <p>User name: admin@gmail.com</p>
                <p>password: 12345</p>
                <div className="row align-items-center pt-5">
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <img
                      className="d-inline-block img-fluid"
                      src="bootstrap5-plain-assets/logos/slack.png"
                      alt=""
                    />
                  </div>
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <img
                      className="d-inline-block img-fluid"
                      src="bootstrap5-plain-assets/logos/dropbox.png"
                      alt=""
                    />
                  </div>
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <img
                      className="d-inline-block img-fluid"
                      src="bootstrap5-plain-assets/logos/spotify.png"
                      alt=""
                    />
                  </div>
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <img
                      className="d-inline-block img-fluid"
                      src="bootstrap5-plain-assets/logos/stripe.png"
                      alt=""
                    />
                  </div>
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <img
                      className="d-inline-block img-fluid"
                      src="bootstrap5-plain-assets/logos/netflix.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
