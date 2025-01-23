const Services = () => {
  const services = [
    {
      title: "Website Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit dui laoreet natoque",
      icon: "🌐",
      color: "bg-green-400",
    },
    {
      title: "Mobile Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit dui laoreet natoque",
      icon: "📱",
      color: "bg-pink-400",
    },
    {
      title: "Dashboard Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit dui laoreet natoque",
      icon: "📊",
      color: "bg-yellow-400",
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12 sm:mb-16">
          <div className="max-w-lg">
            <div className="flex gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-indigo-600 rounded-full" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4">
              My Services
            </h2>
            <p className="text-gray-600">
              Provide high quality services for your brands and make your brands
              shine.
            </p>
          </div>
          <div className="relative hidden sm:block">
            <div className="w-16 sm:w-24 h-16 sm:h-24 rounded-full border-2 border-indigo-600 flex items-center justify-center rotate-45">
              <div className="w-8 sm:w-12 h-8 sm:h-12 bg-indigo-600 rounded-full"></div>
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-indigo-600 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative z-10 p-6 sm:p-8 bg-white rounded-lg border-2 border-gray-100">
                <div
                  className={`w-12 sm:w-14 h-12 sm:h-14 ${service.color} rounded-lg flex items-center justify-center mb-6`}
                >
                  <span className="text-2xl sm:text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
