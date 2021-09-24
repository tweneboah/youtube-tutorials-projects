import React from "react";

const ErrorDisplayMessage = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p class="alert alert-danger" role="alert">
        {children}
      </p>
    </div>
  );
};

export default ErrorDisplayMessage;
