import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../redux/slices/users/usersSlices";
import DisabledButton from "../../components/DisabledButton";

//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  //history
  const history = useHistory();

  //dispatch
  const dispatch = useDispatch();
  //get data from store

  const user = useSelector(state => state?.users);
  const { userAppErr, userServerErr, userLoading, userAuth } = user;

  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect
  useEffect(() => {
    if (userAuth) {
      history.push("/profile");
    }
  }, [userAuth]);

  return (
    <section
      style={{ height: "100vh" }}
      className="position-relative py-5  overflow-hidden bg-warning"
    >
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                Keep Track of what you are spending
              </h2>
              <hr className="text-warning w-100" />
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <span className="text-muted">Sign In</span>
              <h3 className="fw-bold mb-5">Login to your account</h3>
              {/* Display Err */}

              {userAppErr || userServerErr ? (
                <div class="alert alert-danger" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null}
              <form onSubmit={formik.handleSubmit}>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  className="form-control mb-2"
                  type="email"
                  placeholder="E-mail address"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div>
                  {userLoading ? (
                    <DisabledButton />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary py-2 w-100 mb-4"
                    >
                      Login
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
