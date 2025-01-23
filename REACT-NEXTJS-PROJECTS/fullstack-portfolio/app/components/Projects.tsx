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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects?limit=2");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
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

  if (loading) {
    return (
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-red-500">Failed to load projects</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-indigo-600 rounded-full" />
              ))}
            </div>
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">
              Latest Projects
            </h2>
            <p className="text-gray-600 max-w-md">
              Provide high quality services for your brands and make your brands
              shine.
            </p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-indigo-600 flex items-center justify-center rotate-45">
              <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-4 mb-2">
                  {project.categories?.map((category, i) => (
                    <span
                      key={i}
                      className="text-sm text-indigo-600 font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-indigo-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                        >
                          <svg
                            className="w-4 h-4"
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
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                        >
                          <svg
                            className="w-4 h-4"
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
                  <Link
                    href={project.liveUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 transition-colors shrink-0"
                  >
                    <svg
                      className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors"
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
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            <span>View All Projects</span>
            <svg
              className="w-5 h-5"
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
