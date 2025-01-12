import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/propertyCard.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Real Estate App",
  description: "Find your dream property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
