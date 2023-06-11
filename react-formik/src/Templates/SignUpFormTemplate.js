import React from "react";

const SignUpFormTemplate = () => {
  return (
    <div className="form-container">
      <h1 className="form-heading">Sign Up</h1>
      <p className="form-description">
        Join our community to stay updated with the latest trends.
      </p>
      <form>
        <div className="form-field">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input id="username" type="text" className="form-input" />
        </div>

        <div className="form-field">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input id="firstName" type="text" className="form-input" />
        </div>

        <div className="form-field">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input id="lastName" type="text" className="form-input" />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input id="email" type="email" className="form-input" />
        </div>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpFormTemplate;
