"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

export default function ProjectsContent() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your portfolio projects
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isFormVisible ? "Cancel" : "Add New Project"}
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Create New Project
            </h2>
            <ProjectForm
              onSuccess={() => {
                setIsFormVisible(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
