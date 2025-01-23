"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  categories: string[];
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projectsPerPage = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [searchQuery, projects]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DEFF80] via-[#e6ffb3] to-[#DEFF80] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D1B69]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DEFF80] via-[#e6ffb3] to-[#DEFF80] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-red-500">Failed to load projects</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEFF80] via-[#e6ffb3] to-[#DEFF80] py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#4A3AFF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#DEFF80]/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2D1B69]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#2D1B69] via-[#4A3AFF] to-[#8257FF] bg-clip-text text-transparent mb-6 animate-gradient-x">
              My Portfolio
            </h1>
          </div>
          <p className="text-[#2D1B69]/70 max-w-2xl mx-auto text-lg">
            Explore my latest projects and creative works. Each project
            represents a unique challenge and solution.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16 transform hover:scale-[1.02] transition-all duration-300">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-[#2D1B69]/10 focus:border-[#4A3AFF] focus:ring-4 focus:ring-[#4A3AFF]/20 outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 shadow-lg shadow-[#2D1B69]/5 transition-all duration-300"
            />
            <svg
              className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#4A3AFF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div
              key={project._id}
              className="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B69]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#2D1B69] mb-3 group-hover:text-[#4A3AFF] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#2D1B69]/70 text-base line-clamp-2 mb-6">
                  {project.description}
                </p>
                <div className="flex items-center gap-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2D1B69]/5 hover:bg-[#4A3AFF] text-[#4A3AFF] hover:text-white font-medium transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2D1B69]/5 hover:bg-[#4A3AFF] text-[#4A3AFF] hover:text-white font-medium transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg">
              <p className="text-[#2D1B69] text-lg font-medium">
                No projects found matching your search.
              </p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-[#2D1B69]/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A3AFF] hover:text-white transition-all duration-300 shadow-lg shadow-[#2D1B69]/5"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-base font-medium transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-[#4A3AFF] text-white shadow-lg shadow-[#4A3AFF]/30"
                    : "bg-white/90 backdrop-blur-xl border-2 border-[#2D1B69]/10 text-[#2D1B69] hover:bg-[#4A3AFF] hover:text-white shadow-lg shadow-[#2D1B69]/5"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-[#2D1B69]/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A3AFF] hover:text-white transition-all duration-300 shadow-lg shadow-[#2D1B69]/5"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
