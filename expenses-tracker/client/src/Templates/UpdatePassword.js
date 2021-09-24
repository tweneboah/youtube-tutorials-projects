import React from "react";

const UpdatePassword = () => {
  return (
    <section className="position-relative py-5 overflow-hidden vh-100">
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-primary w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">Register</h2>
              <p className="mb-0 text-white">
                Register to have access to this application
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <form>
                <span className="text-muted">New User</span>
                <h3 className="fw-bold mb-5">Register</h3>
                <input
                  className="form-control mb-2"
                  type="email"
                  placeholder="E-mail address"
                />
                <input
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                <button className="btn btn-primary py-2 w-100 mb-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
