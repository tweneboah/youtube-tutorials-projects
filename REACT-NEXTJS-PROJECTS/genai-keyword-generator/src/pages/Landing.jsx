import { Link } from "react-router-dom";
import { BsLightningCharge, BsRocket, BsSearch } from "react-icons/bs";
import { FaChartLine, FaRegLightbulb } from "react-icons/fa";
import { MdOutlineHistory, MdSpeed, MdTrendingUp } from "react-icons/md";
import { useRef } from "react";

function Landing() {
  const featuresRef = useRef(null);

  const scrollToFeatures = (e) => {
    e.preventDefault();
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-4 sm:p-6">
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-24 sm:pt-32 pb-8 sm:pb-16">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <BsRocket className="text-3xl sm:text-4xl text-blue-600 animate-bounce" />
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              SEO Keyword Generator
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Supercharge your content strategy with AI-powered keyword
            generation. Get smarter suggestions, better rankings, and more
            organic traffic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg text-center"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                2x
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Faster Content Creation
              </div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600">
                10+
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Keywords Per Search
              </div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                100%
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                AI-Powered Results
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" ref={featuresRef} className="mt-24 sm:mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 text-gray-800">
            Powerful Features for SEO Success
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Original feature cards */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl text-blue-500 mb-4">
                <MdSpeed className="inline-block" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Smart Generation
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Advanced AI algorithms to generate relevant keywords for your
                content in seconds
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl text-purple-500 mb-4">
                <FaChartLine className="inline-block" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Trend Analysis
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get keywords that align with current search trends and user
                intent
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl text-blue-500 mb-4">
                <MdOutlineHistory className="inline-block" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                History Tracking
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Keep track of all your generated keywords with easy access to
                past searches
              </p>
            </div>
          </div>

          {/* Detailed Features Section */}
          <div className="mt-16 sm:mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
              {/* Feature columns */}
              <div className="space-y-8 sm:space-y-12">
                <div className="flex gap-4 items-start">
                  <div className="text-2xl sm:text-3xl text-blue-500 p-3 bg-blue-50 rounded-xl">
                    <BsSearch />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Intelligent Keyword Research
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Our AI analyzes search patterns and user behavior to
                      suggest the most relevant keywords for your content.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-2xl sm:text-3xl text-purple-500 p-3 bg-purple-50 rounded-xl">
                    <MdTrendingUp />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Real-time Trend Analysis
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Stay ahead of the competition with keywords that reflect
                      current market trends and search patterns.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 sm:space-y-12">
                <div className="flex gap-4 items-start">
                  <div className="text-2xl sm:text-3xl text-blue-500 p-3 bg-blue-50 rounded-xl">
                    <FaRegLightbulb />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Smart Suggestions
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Get intelligent keyword variations and long-tail
                      suggestions to maximize your content's reach.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-2xl sm:text-3xl text-purple-500 p-3 bg-purple-50 rounded-xl">
                    <BsLightningCharge />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Lightning Fast Results
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Generate comprehensive keyword lists in seconds, not
                      hours. Save time and focus on creating great content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 text-center bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-3xl p-8 sm:p-12 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Boost Your SEO?
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of content creators who are already using our
            AI-powered keyword generator to improve their search rankings.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <BsLightningCharge className="text-yellow-500" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 sm:mt-32 pb-6 sm:pb-8 text-center text-gray-600 text-sm">
        <p>© 2025 SEO Keyword Generator-MasyncTech. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
