import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#DEFF80]">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8 md:px-16">
        <div className="text-[#2D1B69] text-2xl font-bold">PL</div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-[#2D1B69] hover:text-[#4A3AFF]">
            About
          </Link>
          <Link
            href="#portfolio"
            className="text-[#2D1B69] hover:text-[#4A3AFF]"
          >
            Portfolio
          </Link>
          <Link
            href="#services"
            className="text-[#2D1B69] hover:text-[#4A3AFF]"
          >
            Services
          </Link>
          <Link
            href="#testimonials"
            className="text-[#2D1B69] hover:text-[#4A3AFF]"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="bg-white text-[#4A3AFF] px-6 py-2 rounded-full hover:bg-[#4A3AFF] hover:text-white transition-all"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-16 py-8 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative order-2 md:order-1">
            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#8257FF] rounded-full blur-3xl opacity-20"></div>
            <div className="absolute top-8 left-8 w-24 md:w-32 h-24 md:h-32">
              <div className="w-2 h-2 bg-[#4A3AFF] rounded-full"></div>
              <div className="w-2 h-2 bg-[#4A3AFF] rounded-full ml-4"></div>
              <div className="w-2 h-2 bg-[#4A3AFF] rounded-full ml-8"></div>
            </div>

            {/* Profile image with circular background */}
            <div className="relative w-full md:w-[400px] h-[400px] md:h-[600px] mx-auto overflow-hidden">
              <div className="absolute -z-10 right-0 top-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#4A3AFF] rounded-full opacity-75 blur-2xl"></div>
              <div className="absolute -z-10 left-0 bottom-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#8257FF] rounded-full opacity-50 blur-3xl"></div>
              <Image
                src="https://cdn.pixabay.com/photo/2021/05/10/14/15/corset-6243486_1280.jpg"
                alt="Fashion design showcase"
                width={600}
                height={800}
                className="rounded-2xl object-cover w-full h-full object-top hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 order-1 md:order-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-[#2D1B69] flex items-center gap-2">
                ✨ <span>Fashion & Design</span>
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D1B69] leading-tight">
              Creative
              <br />
              Fashion Designer
            </h1>
            <p className="text-[#2D1B69]/80 text-base md:text-lg max-w-md mx-auto md:mx-0">
              Crafting unique fashion experiences through innovative design.
              Transforming ideas into stunning garments that make a statement.
            </p>
            <button className="bg-[#4A3AFF] text-white px-6 md:px-8 py-3 rounded-full hover:bg-[#8257FF] transition-all flex items-center gap-2 mx-auto md:mx-0">
              View Collection
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-4 mt-8 md:mt-12">
          <div className="bg-[#4A3AFF] p-8 rounded-xl text-white group hover:bg-[#4A3AFF]/90 transition-all">
            <h3 className="text-4xl font-bold mb-4">Design</h3>
            <p className="text-white/90">
              Expert in fashion design, pattern making, and garment
              construction. Creating unique pieces that blend style with
              functionality.
            </p>
          </div>
          <div className="bg-[#8257FF] p-8 rounded-xl text-white group hover:bg-[#8257FF]/90 transition-all">
            <h3 className="text-4xl font-bold mb-4">Craft</h3>
            <p className="text-white/90">
              Skilled in haute couture techniques, fabric manipulation, and
              sustainable fashion practices.
            </p>
          </div>
        </div>
      </section>

      <Stats />
      <Services />
      <Projects />
      <Testimonials />
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center p-1 text-gray-500 mb-8">
            Get in Touch
          </h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
