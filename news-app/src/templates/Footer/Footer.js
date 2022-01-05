import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <section className="footer-area footer-five">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="footer-top-content">
              <div className="footer-logo text-center">
                <a href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw">
                  <i className="lni lni-opera h1 text-warning"></i>
                </a>
              </div>
              {/* footer logo */}
              <p className="text-center">
                Get all the latest news and information on the latest events
                around the globe.
              </p>
              <h5 className="text-center social-title">Follow Us On</h5>
              <ul className="social text-center mt-60">
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
                  >
                    <i className="lni lni-facebook-filled" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
                  >
                    <i className="lni lni-twitter-original" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
                  >
                    <i className="lni lni-instagram-filled" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
                  >
                    <i className="lni lni-linkedin-original" />
                  </a>
                </li>
              </ul>
              {/* social */}
            </div>
          </div>
        </div>
        {/* row */}
      </div>
      {/* container */}
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="copyright text-center">
                <p className="text">
                  Copyright © 2022 iNovotek. All Rights Reserved
                </p>
              </div>
              {/*  copyright */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
