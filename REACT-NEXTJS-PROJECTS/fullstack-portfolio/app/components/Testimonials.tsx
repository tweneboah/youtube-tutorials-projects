const Testimonials = () => {
  const testimonials = [
    {
      company: "bobcat",
      author: "Arlene McCoy",
      role: "Founder Bobcat",
      content:
        "It fits our needs perfectly. Man, this thing is getting better and better as I learn more about it. You've saved our business!",
    },
    {
      company: "Sarna",
      author: "Courtney Henry",
      role: "Founder Sarna",
      content:
        "I love your system. Thank you for making it painless, pleasant and most of all hassle free! Thanks for the great service, really good.",
    },
  ];

  return (
    <div className="bg-indigo-600 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#E2F69E] mb-4">
            Trusted by Brands
            <br />& Companies
          </h2>
          <p className="text-gray-200 max-w-md">
            I've built products for companies and businesses around the globe.
            Here's our Brands & Companies testimonials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#E2F69E] p-8 rounded-lg relative">
              <div className="absolute -top-2 -right-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-indigo-600 rounded-full"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-indigo-900 mb-1">
                  {testimonial.company}
                </h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-6">"{testimonial.content}"</p>

              <div>
                <p className="font-bold text-indigo-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
