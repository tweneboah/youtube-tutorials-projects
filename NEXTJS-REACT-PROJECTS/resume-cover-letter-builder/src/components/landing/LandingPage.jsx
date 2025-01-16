import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaMagic, FaRocket, FaRegClock, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { HiOutlineTemplate, HiOutlineDocumentText } from 'react-icons/hi';
import { BsGoogle } from 'react-icons/bs';

const features = [
  {
    icon: <FaMagic className="h-8 w-8 text-white" />,
    title: 'AI-Powered Content Generation',
    description: 'Leverage Google\'s Gemini AI to create compelling resumes and cover letters tailored to your industry.',
    color: 'from-purple-500 to-indigo-600',
    delay: 0.2
  },
  {
    icon: <HiOutlineTemplate className="h-8 w-8 text-white" />,
    title: 'Professional Templates',
    description: 'Choose from a variety of ATS-friendly templates designed by HR professionals.',
    color: 'from-blue-500 to-cyan-600',
    delay: 0.4
  },
  {
    icon: <FaRegClock className="h-8 w-8 text-white" />,
    title: 'Real-time Preview',
    description: 'See changes instantly as you edit, ensuring your document looks perfect before export.',
    color: 'from-green-500 to-teal-600',
    delay: 0.6
  },
  {
    icon: <FaRocket className="h-8 w-8 text-white" />,
    title: 'Quick Export',
    description: 'Export your documents in multiple formats including PDF and Word, ready for submission.',
    color: 'from-orange-500 to-pink-600',
    delay: 0.8
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    content: 'The AI suggestions helped me highlight achievements I would have otherwise overlooked. Landed my dream job!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    color: 'from-pink-500 to-rose-600',
    delay: 0.2
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    content: 'The modern templates and real-time preview feature made creating my resume a breeze.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    color: 'from-violet-500 to-purple-600',
    delay: 0.4
  }
];

export default function LandingPage() {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div 
                className="sm:text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Create Your Perfect</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Resume & Cover Letter
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Craft professional resumes and cover letters in minutes with our AI-powered builder. 
                  Stand out from the crowd with modern templates and expert suggestions.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <motion.div
                    className="rounded-md shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started Free
                    </Link>
                  </motion.div>
                  <motion.div
                    className="mt-3 sm:mt-0 sm:ml-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 md:py-4 md:text-lg md:px-10"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Person working on resume"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Everything you need to land your dream job
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Our AI-powered platform helps you create professional resumes and cover letters that get noticed.
            </p>
          </motion.div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: feature.delay }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-90 transform -rotate-2 scale-105 transition-transform group-hover:rotate-0 group-hover:scale-110`} />
                  <div className="relative p-8 bg-gray-800 rounded-2xl transform rotate-2 group hover:rotate-0 transition-transform">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        {feature.icon}
                      </div>
                      <motion.div
                        className="h-1 w-24 bg-gradient-to-r from-transparent to-blue-500 rounded"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 1, delay: feature.delay + 0.3 }}
                      />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-lg text-gray-300">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${feature.color}`}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: feature.delay + 0.5 }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-400">100%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-white">
              Trusted by job seekers worldwide
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              See what our users have to say about their success stories
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: testimonial.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} rounded-2xl opacity-90 transform -rotate-2 scale-105`} />
                <div className="relative p-8 bg-gray-900 rounded-2xl transform rotate-2">
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-full border-2 border-white"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-white">{testimonial.name}</div>
                      <div className="text-blue-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">{testimonial.content}</p>
                  <motion.div
                    className="mt-6 h-1 bg-gradient-to-r from-transparent to-blue-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: testimonial.delay + 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <div className="relative max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to boost your career?</span>
              <span className="block">Start building your resume today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-200">
              Join thousands of professionals who have already landed their dream jobs using our platform.
            </p>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 sm:w-auto"
              >
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {[
              { icon: <FaTwitter className="h-6 w-6" />, href: '#', label: 'Twitter' },
              { icon: <FaGithub className="h-6 w-6" />, href: '#', label: 'GitHub' },
              { icon: <FaLinkedin className="h-6 w-6" />, href: '#', label: 'LinkedIn' }
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
                whileHover={{ scale: 1.2, color: '#60A5FA' }}
              >
                <span className="sr-only">{item.label}</span>
                {item.icon}
              </motion.a>
            ))}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
