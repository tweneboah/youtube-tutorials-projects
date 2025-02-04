import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import axios from "axios";
import {
  FaKeyboard,
  FaCopy,
  FaTrash,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";
import { BsLightningCharge, BsRocket } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import ApiKeyModal from "../components/ApiKeyModal";

function Dashboard() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedKeywords, setSavedKeywords] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("cohereApiKey") || ""
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "keywords"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSavedKeywords(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item.userId === user.uid)
      );
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!localStorage.getItem("cohereApiKey")) {
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("cohereApiKey", key);
  };

  const generateKeywords = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cohere.com/v1/chat",
        {
          model: "command-r-08-2024",
          message: `Generate 10 SEO keywords for the topic: ${topic}. Return only the keywords separated by commas, without any additional text or explanation.`,
          temperature: 0.3,
          chat_history: [],
          prompt_truncation: "AUTO",
          stream: false,
          connectors: [{ id: "web-search" }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const keywordList = response.data.text
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword);

      setKeywords(keywordList);

      await addDoc(collection(db, "keywords"), {
        topic,
        keywords: keywordList,
        userId: user.uid,
        userName: user.displayName,
        timestamp: new Date(),
      });

      setTopic("");
    } catch (error) {
      console.error("Error generating keywords:", error);
      if (error.response?.status === 401) {
        alert("Invalid API key. Please check your API key and try again.");
        setIsApiKeyModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  const clearHistory = async () => {
    if (
      window.confirm("Are you sure you want to clear all your keyword history?")
    ) {
      try {
        const batch = [];
        savedKeywords.forEach((item) => {
          if (item.userId === user.uid) {
            batch.push(deleteDoc(doc(db, "keywords", item.id)));
          }
        });
        await Promise.all(batch);
      } catch (error) {
        console.error("Error clearing history:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BsRocket className="text-2xl text-blue-600" />
              <span className="font-semibold text-xl text-gray-800 hidden sm:inline">
                Keyword Generator
              </span>
            </div>
            {user && (
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 hidden sm:inline">
                    {user.displayName}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setIsApiKeyModalOpen(true)}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                    title="API Key Settings"
                  >
                    <FaKey />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                    title="Sign Out"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* Generator Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
            <BsLightningCharge className="text-yellow-500" />
            Generate Keywords
          </h2>
          <form onSubmit={generateKeywords}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic..."
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {loading ? (
                  "Generating..."
                ) : (
                  <>
                    <BsLightningCharge />
                    Generate
                  </>
                )}
              </button>
            </div>
          </form>

          {keywords.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Generated Keywords:
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span>{keyword}</span>
                    <button
                      onClick={() => copyToClipboard(keyword)}
                      className="text-blue-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <FaCopy />
                    </button>
                  </div>
                ))}
              </div>
              {copySuccess && (
                <div className="text-green-500 mt-2">{copySuccess}</div>
              )}
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <MdHistory className="text-purple-500" />
              History
            </h2>
            {savedKeywords.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-red-500 hover:text-red-700 flex items-center gap-1 sm:gap-2 text-sm"
              >
                <FaTrash />
                <span className="hidden sm:inline">Clear History</span>
              </button>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {savedKeywords.length === 0 ? (
              <p className="text-center text-gray-500 py-6 sm:py-8">
                No keywords generated yet. Try generating some keywords above!
              </p>
            ) : (
              savedKeywords.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-100 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                    Topic: {item.topic}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 px-2 sm:px-3 py-1 rounded-full flex items-center gap-2 group text-sm"
                      >
                        <span>{keyword}</span>
                        <button
                          onClick={() => copyToClipboard(keyword)}
                          className="text-gray-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:text-gray-600"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
    </div>
  );
}

export default Dashboard;
