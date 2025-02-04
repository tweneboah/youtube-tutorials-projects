import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import SavedJobsPage from "./pages/SavedJobsPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Login";
import Register from "./components/Register";
import "./css/index.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("javascript developer");
  const [filters, setFilters] = useState({
    location: "",
    salary: "",
    jobType: "",
  });

  const API_ID = import.meta.env.VITE_ADZUNA_API_ID;
  const API_KEY = import.meta.env.VITE_ADZUNA_API_KEY;

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${API_ID}&app_key=${API_KEY}&results_per_page=20&what=${encodeURIComponent(
        searchTerm
      )}`;

      const filterParams = new URLSearchParams();
      if (filters.location) filterParams.append("where", filters.location);
      if (filters.salary) filterParams.append("salary_min", filters.salary);
      if (filters.jobType === "full_time")
        filterParams.append("contract_type", "full_time");
      if (filters.jobType === "part_time")
        filterParams.append("contract_type", "part_time");
      if (filters.jobType === "contract")
        filterParams.append("contract_type", "contract");

      const response = await fetch(`${baseUrl}&${filterParams.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.results) {
        throw new Error("Invalid data format received from API");
      }

      console.log("API Response:", data); // Debug log
      setJobs(data.results);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
      setError(err.message || "Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, filters]);

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <header className="header">
            <Navigation />
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  jobs={jobs}
                  loading={loading}
                  error={error}
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                />
              }
            />
            <Route path="/saved-jobs" element={<SavedJobsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            maxWidth: "none",
            padding: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          },
          success: {
            style: {
              background: "#10B981",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "white",
              secondary: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "white",
              secondary: "#EF4444",
            },
          },
        }}
        containerStyle={{
          bottom: 40,
        }}
      />
    </Router>
  );
};

export default App;
