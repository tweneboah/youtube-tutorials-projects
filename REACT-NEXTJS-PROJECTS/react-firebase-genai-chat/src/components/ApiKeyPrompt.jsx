import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ApiKeyPrompt() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    window.location.reload();

    try {
      // Store API key in localStorage
      localStorage.setItem("gemini_api_key", apiKey);
      setIsModalVisible(false);
      navigate("/chat");
    } catch (err) {
      setError("Failed to save API key. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && apiKey.trim()) {
      handleSubmit(e);
    }
  };

  return (
    <>
      {isModalVisible && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
          <div className="max-w-lg mx-auto pt-[10vh]">
            <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-fadeIn overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <h2 className="text-3xl font-bold mb-2">Enter Gemini API Key</h2>
                  <p className="text-blue-100">
                    You need a Gemini API key to use this application
                  </p>
                </div>
              </div>

              <div className="p-8">
                {error && (
                  <div className="p-4 mb-6 bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-shake">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your Gemini API key"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                               bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                               focus:border-transparent transition-all duration-200
                               placeholder-gray-400 dark:placeholder-gray-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !apiKey.trim()}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                             hover:from-blue-700 hover:to-indigo-700 text-white font-medium
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600
                             disabled:hover:to-indigo-600 transform hover:-translate-y-0.5
                             transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? "Saving..." : "Continue"}
                  </button>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      Don't have an API key?{" "}
                      <a
                        href="https://makersuite.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Get one here
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApiKeyPrompt;
