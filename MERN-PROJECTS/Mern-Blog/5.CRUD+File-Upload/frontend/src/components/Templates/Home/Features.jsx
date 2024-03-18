import React from "react";
import {
  FaDollarSign,
  FaUsers,
  FaChartLine,
  FaHeart,
  FaStar,
  FaThumbsUp,
} from "react-icons/fa";

const Features = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <p className="uppercase text-blue-600 text-center text-sm font-bold font-heading mb-4">
          UNIQUE FEATURES
        </p>
        <h1 className="text-center text-4xl lg:text-5xl font-bold font-heading mb-24">
          Engage, Grow, and Monetize Your Passion
        </h1>
        <div className="flex flex-wrap -mx-4">
          {/* Feature 1: Monetize Your Content */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-green-500 ml-4">
                  <FaDollarSign className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-green-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Earn with Every View
                </h2>
                <p className="text-gray-600">
                  Turn your passion into profit! Earn from every post view and
                  build a steady stream of income through your content.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Subscription and Followers */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4 border-l border-dashed border-gray-50 lg:border-transparent">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-red-600 ml-4">
                  <FaUsers className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-red-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Build Your Community
                </h2>
                <p className="text-gray-600">
                  Grow your followers and engage with a dedicated audience.
                  Offer exclusive content through subscriptions and keep your
                  community thriving.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Dashboard */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-blue-600 ml-4">
                  <FaChartLine className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-blue-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Intuitive Dashboard
                </h2>
                <p className="text-gray-600">
                  Navigate your journey with ease. Our dashboard provides
                  real-time insights into your performance and audience
                  engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Followers */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-pink-500 ml-4">
                  <FaHeart className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-pink-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Connect with Followers
                </h2>
                <p className="text-gray-600">
                  Build a loyal fanbase. Engage directly with your followers,
                  understand their preferences, and tailor your content to their
                  interests.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5: Creators Ranking */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-yellow-500 ml-4">
                  <FaStar className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-yellow-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Creators Leaderboard
                </h2>
                <p className="text-gray-600">
                  Climb the ranks in our creators leaderboard. Showcase your
                  talent and gain recognition within our vibrant community.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 6: Likes and Engagement */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-purple-600 ml-4">
                  <FaThumbsUp className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-purple-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Engage and Inspire
                </h2>
                <p className="text-gray-600">
                  Foster engagement with likes and interactive features. Inspire
                  your audience and encourage meaningful interactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
