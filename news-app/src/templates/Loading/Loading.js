import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="error-area">
      <svg
        className="shape"
        width={1432}
        height={1079}
        viewBox="0 0 1432 1079"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M728 0H0L675.5 1078.5H1431.5L728 0Z"
          fill="url(#paint0_linear_169:483)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_169:483"
            x1={277}
            y1={-211}
            x2={875}
            y2={923}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#155BD5" stopOpacity="0.29" />
            <stop offset={1} stopColor="#155BD5" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="shape2"
        width={1432}
        height={1079}
        viewBox="0 0 1432 1079"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M703.5 1078.5L1431.5 1078.5L756 6.30162e-05L9.42855e-05 -3.07539e-06L703.5 1078.5Z"
          fill="url(#paint0_linear_169:483)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_169:483"
            x1="1154.5"
            y1="1289.5"
            x2="556.5"
            y2="155.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#155BD5" stopOpacity="0.29" />
            <stop offset={1} stopColor="#155BD5" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="error-content">
              <h3>Loading...</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
