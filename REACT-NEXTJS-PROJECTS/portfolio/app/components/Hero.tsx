import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[#E2F69E] min-h-screen pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="relative">
            <div className="absolute top-0 left-0">
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-indigo-600 rounded-full" />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -z-10 left-20 top-0">
                <div className="w-64 h-64 bg-indigo-600 rounded-full opacity-80 blur-lg"></div>
              </div>
              <div className="relative z-10 max-w-md mx-auto lg:mx-0">
                <Image
                  src="https://cdn.pixabay.com/photo/2021/05/10/14/15/corset-6243486_1280.jpg"
                  alt="Profile"
                  width={400}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="pt-8 lg:pt-20 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <span className="text-xl">👋</span>
              <p className="text-lg">This is Your Name</p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-indigo-900 mb-6">
              Extremely
              <br />
              Design Lover
            </h1>

            <p className="text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
              Hey, I'm passionate UI/UX design lover. Helping creative
              professionals to increase their worth by improving their craft and
              process.
            </p>

            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto lg:mx-0 hover:bg-indigo-700 transition-colors">
              Let's Talk
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* UI/UX Section */}
        <div className="grid md:grid-cols-2 gap-4 mt-16">
          <div className="bg-indigo-600 text-white p-8 rounded-lg">
            <h2 className="text-4xl font-bold mb-4">UI</h2>
            <p>
              Highly Skilled at progressive enhancement, design systems & UI
              Engineering.
            </p>
          </div>
          <div className="bg-purple-600 text-white p-8 rounded-lg">
            <h2 className="text-4xl font-bold mb-4">UX</h2>
            <p>
              Senior UX Designer with almost decade of experience designing
              website and mobile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
