import Image from "next/image";

const Stats = () => {
  return (
    <div className="bg-indigo-600 mt-10 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#E2F69E]">
              Over the Past
              <br />8 Years,
            </h2>
            <p className="text-gray-200 max-w-md">
              I've built products for companies and businesses around the globe,
              ranging from marketing websites to complex solutions and
              enterprise apps with focus on fast, elegant and accessible user
              experiences.
            </p>
            <div className="flex gap-12 pt-4">
              <div>
                <h3 className="text-4xl font-bold text-[#E2F69E]">254+</h3>
                <p className="text-gray-200">Project Completed</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#E2F69E]">215+</h3>
                <p className="text-gray-200">Happy Clients</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 right-4 z-10">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-[#E2F69E] rounded-full" />
                ))}
              </div>
            </div>
            <div className="absolute -top-4 right-12 z-10">
              <div className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm shadow-lg">
                UX Designer
              </div>
            </div>
            <div className="absolute top-12 right-4 z-10">
              <div className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm shadow-lg">
                UI Designer
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 right-0 top-0">
                <svg className="w-48 h-48 text-[#E2F69E]" viewBox="0 0 200 200">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M160,20 Q140,40 120,60 Q100,80 80,100"
                    className="opacity-20"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M180,40 Q160,60 140,80 Q120,100 100,120"
                    className="opacity-20"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M200,60 Q180,80 160,100 Q140,120 120,140"
                    className="opacity-20"
                  />
                </svg>
              </div>
              <div className="relative z-0 w-full max-w-md mx-auto">
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
        </div>
      </div>
    </div>
  );
};

export default Stats;
