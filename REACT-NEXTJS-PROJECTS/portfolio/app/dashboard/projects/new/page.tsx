"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AddProject() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("githubUrl", githubUrl);
      formData.append("liveUrl", liveUrl);
      if (image) {
        formData.append("image", image);
      }

      console.log("Submitting project data...");
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      console.log("Project created successfully:", data);
      toast.success("Project added successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEFF80] via-[#e6ffb3] to-[#DEFF80] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2D1B69] via-[#4A3AFF] to-[#8257FF] bg-clip-text text-transparent">
            Add New Project
          </h1>
          <p className="text-[#2D1B69]/70 mt-2">
            Showcase your latest work with detailed information
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-[#4A3AFF]/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div className="group">
              <label className="block text-[#2D1B69] font-semibold mb-2">
                Project Image
              </label>
              <div className="relative">
                <div
                  className={`relative h-[300px] w-full rounded-xl overflow-hidden bg-[#2D1B69]/5 border-2 border-dashed ${
                    dragActive
                      ? "border-[#4A3AFF] bg-[#4A3AFF]/5"
                      : "border-[#2D1B69]/20"
                  } hover:border-[#4A3AFF]/50 transition-all`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer px-4 py-2 bg-white rounded-lg text-[#2D1B69] font-medium hover:bg-[#4A3AFF] hover:text-white transition-all"
                        >
                          Change Image
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-[#2D1B69]/40"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mt-4 text-[#2D1B69]/60 text-sm">
                          Drag and drop your project image here, or{" "}
                          <label
                            htmlFor="image-upload"
                            className="text-[#4A3AFF] hover:text-[#8257FF] cursor-pointer"
                          >
                            browse
                          </label>
                        </p>
                        <p className="mt-2 text-[#2D1B69]/40 text-xs">
                          Supports: PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="group">
              <label className="block text-[#2D1B69] font-semibold mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B69]/20 focus:border-[#4A3AFF] outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 transition-all duration-300 shadow-lg shadow-[#2D1B69]/5 hover:shadow-xl hover:border-[#4A3AFF]/50"
                placeholder="Enter project title"
              />
            </div>

            {/* Description */}
            <div className="group">
              <label className="block text-[#2D1B69] font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B69]/20 focus:border-[#4A3AFF] outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 transition-all duration-300 shadow-lg shadow-[#2D1B69]/5 hover:shadow-xl hover:border-[#4A3AFF]/50 resize-none"
                placeholder="Describe your project"
              />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-[#2D1B69] font-semibold mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B69]/20 focus:border-[#4A3AFF] outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 transition-all duration-300 shadow-lg shadow-[#2D1B69]/5 hover:shadow-xl hover:border-[#4A3AFF]/50"
                  placeholder="https://github.com/username/project"
                />
              </div>
              <div className="group">
                <label className="block text-[#2D1B69] font-semibold mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B69]/20 focus:border-[#4A3AFF] outline-none text-[#2D1B69] placeholder-[#2D1B69]/40 transition-all duration-300 shadow-lg shadow-[#2D1B69]/5 hover:shadow-xl hover:border-[#4A3AFF]/50"
                  placeholder="https://your-project.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#4A3AFF] to-[#8257FF] text-white font-semibold rounded-xl transform hover:scale-[1.02] hover:shadow-xl shadow-lg shadow-[#4A3AFF]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10">
                  {loading ? "Creating Project..." : "Create Project"}
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8257FF] to-[#4A3AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
