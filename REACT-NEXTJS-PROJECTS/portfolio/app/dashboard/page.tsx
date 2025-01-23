"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectList from "@/components/dashboard/ProjectList";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEFF80] via-[#e6ffb3] to-[#DEFF80]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2D1B69] to-[#4A3AFF] bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-[#2D1B69]/70 mt-2">
              Manage and showcase your portfolio projects
            </p>
          </div>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A3AFF] to-[#8257FF] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#4A3AFF]/20 transition-all duration-300 transform hover:translate-y-[-2px]"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Project
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A3AFF]"></div>
          </div>
        ) : error ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2D1B69] mb-2">
              Failed to Load Projects
            </h3>
            <p className="text-[#2D1B69]/70 mb-6">{error}</p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A3AFF] to-[#8257FF] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#4A3AFF]/20 transition-all duration-300"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
    </div>
  );
}
