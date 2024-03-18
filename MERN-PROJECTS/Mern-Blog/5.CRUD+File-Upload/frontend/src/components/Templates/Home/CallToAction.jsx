import React from "react";
import { FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-24 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="bg-white border border-orange-100 rounded-4xl py-20 px-8">
          <div className="flex justify-center mb-6">
            <FaLightbulb className="text-orange-500" size="68" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 text-center max-w-lg lg:max-w-2xl mx-auto">
            Discover Fun and Exciting Knowledge
          </h1>
          <p className="text-gray-500 text-center mb-10">
            Embark on an exciting learning adventure together - Join now!
          </p>
          <div className="flex justify-center">
            <Link
              className="w-full sm:w-auto text-center py-5 px-8 mb-8 h-16 inline-flex items-center justify-center rounded-full bg-orange-500 border border-orange-600 shadow font-bold font-heading text-white hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200"
              to="/register"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
