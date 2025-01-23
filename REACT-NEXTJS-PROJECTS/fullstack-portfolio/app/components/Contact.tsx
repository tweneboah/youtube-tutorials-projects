"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-[#DEFF80]/30">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#DEFF80] rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4A3AFF] rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2D1B69]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#2D1B69] via-[#4A3AFF] to-[#8257FF] bg-clip-text text-transparent">
                Get in Touch
              </h2>
            </div>
            <p className="text-[#2D1B69] text-lg font-medium">
              Have a question or want to work together? Drop me a message!
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-[#4A3AFF]/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-[#2D1B69] font-medium mb-2 text-sm">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B69]/10 focus:border-[#4A3AFF] outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 transition-all duration-300 shadow-lg shadow-[#2D1B69]/5 hover:shadow-xl hover:border-[#4A3AFF]/50"
                    placeholder="John Doe"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4A3AFF] to-[#8257FF] opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="group">
                <label className="block text-[#2D1B69] font-medium mb-2 text-sm">
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B69]/10 focus:border-[#4A3AFF] outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 transition-all duration-300 shadow-lg shadow-[#2D1B69]/5 hover:shadow-xl hover:border-[#4A3AFF]/50"
                    placeholder="john@example.com"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4A3AFF] to-[#8257FF] opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="group">
                <label className="block text-[#2D1B69] font-medium mb-2 text-sm">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B69]/10 focus:border-[#4A3AFF] outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 transition-all duration-300 shadow-lg shadow-[#2D1B69]/5 hover:shadow-xl hover:border-[#4A3AFF]/50 resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4A3AFF] to-[#8257FF] opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#4A3AFF] to-[#8257FF] text-white font-medium rounded-xl transform hover:scale-[1.02] hover:shadow-xl shadow-lg shadow-[#4A3AFF]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group min-w-[200px]"
                >
                  <span className="relative z-10">
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8257FF] to-[#4A3AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="text-center p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 font-medium shadow-lg">
                  Message sent successfully! ✨
                </div>
              )}
              {error && (
                <div className="text-center p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 font-medium shadow-lg">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
