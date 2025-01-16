"use client";

import { FaHome, FaHandshake, FaUsers, FaAward, FaChartLine } from "react-icons/fa";
import { MdSecurity, MdSupport, MdLocationCity } from "react-icons/md";
import { BiHappyBeaming } from "react-icons/bi";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#050b2c] to-[#0a1854] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Trusted Real Estate Partner
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We're dedicated to making your property journey seamless and successful
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#ffa509]">10+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#ffa509]">1000+</div>
                <div className="text-sm text-gray-300">Properties Listed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#ffa509]">500+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#050b2c] mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg">
              To provide exceptional real estate services by combining innovative technology
              with personalized customer care, ensuring every client finds their perfect property.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHandshake className="w-8 h-8" />,
                title: "Trust & Reliability",
                description: "Building lasting relationships through transparency and integrity"
              },
              {
                icon: <MdSecurity className="w-8 h-8" />,
                title: "Secure Transactions",
                description: "Ensuring safe and secure property transactions"
              },
              {
                icon: <BiHappyBeaming className="w-8 h-8" />,
                title: "Client Satisfaction",
                description: "Putting our clients' needs first, always"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-[#ffa509] mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#050b2c] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-gradient-to-br from-[#050b2c] to-[#0a1854] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaAward />,
                title: "Expert Team",
                description: "Professional and experienced real estate agents"
              },
              {
                icon: <MdLocationCity />,
                title: "Prime Locations",
                description: "Access to the best properties in prime locations"
              },
              {
                icon: <FaChartLine />,
                title: "Market Analysis",
                description: "Detailed market insights and property valuations"
              },
              {
                icon: <MdSupport />,
                title: "24/7 Support",
                description: "Round-the-clock assistance for all your queries"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl"
              >
                <div className="text-[#ffa509] text-3xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#050b2c] text-center mb-16">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
              },
              {
                name: "Sarah Johnson",
                role: "Senior Property Consultant",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
              },
              {
                name: "Michael Brown",
                role: "Market Analysis Expert",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#050b2c] mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#050b2c] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us help you discover the perfect property that matches your needs and preferences.
          </p>
          <button
            onClick={() => window.location.href = '/properties'}
            className="bg-[#ffa509] hover:bg-[#ff9100] text-[#050b2c] px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <FaHome className="w-5 h-5" />
            Browse Properties
          </button>
        </div>
      </div>
    </div>
  );
}
