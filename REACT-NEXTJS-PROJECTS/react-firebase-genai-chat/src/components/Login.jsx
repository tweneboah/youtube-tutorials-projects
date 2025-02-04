import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";
import { loginUser, registerUser, signInWithGoogle } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const { user, error: authError } = await (isRegistering
        ? registerUser(values.email, values.password)
        : loginUser(values.email, values.password));

      if (authError) {
        setError(authError);
        return;
      }

      if (user) {
        navigate("/chat");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const { user, error: authError } = await signInWithGoogle();
      if (authError) {
        setError(authError);
        return;
      }
      if (user) {
        navigate("/chat");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-lg mx-auto pt-[10vh]">
        {/* Glass Card Container */}
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-fadeIn overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {isRegistering ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-blue-100">
                {isRegistering
                  ? "Join our community of developers"
                  : "Sign in to continue coding"}
              </p>
            </div>
          </div>

          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="p-4 mb-6 bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <div className="space-y-4">
                    <div>
                      <Field
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                 focus:border-transparent transition-all duration-200
                                 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1.5 text-sm text-red-500 pl-1 animate-slideIn"
                      />
                    </div>

                    <div>
                      <Field
                        name="password"
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                 focus:border-transparent transition-all duration-200
                                 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-1.5 text-sm text-red-500 pl-1 animate-slideIn"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                             hover:from-blue-700 hover:to-indigo-700 text-white font-medium
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600
                             disabled:hover:to-indigo-600 transform hover:-translate-y-0.5
                             transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : isRegistering ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                             border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50
                             text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
                             hover:border-blue-500 dark:hover:border-blue-400 transform hover:-translate-y-0.5
                             font-medium"
                  >
                    <FaGoogle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Continue with Google
                  </button>
                </Form>
              )}
            </Formik>

            {/* Toggle Auth Mode */}
            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium
                         focus:outline-none focus:underline transition-colors duration-200"
              >
                {isRegistering ? "Sign in" : "Create one"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
