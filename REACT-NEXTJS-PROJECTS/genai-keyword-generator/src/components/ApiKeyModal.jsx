import { useState } from "react";
import { FaTimes, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

function ApiKeyModal({ isOpen, onClose, onSave, currentApiKey }) {
  const [apiKey, setApiKey] = useState(currentApiKey || "");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      alert("Please enter a valid API key");
      return;
    }
    onSave(apiKey);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <FaKey className="text-2xl text-blue-500" />
          <h2 className="text-2xl font-semibold">Cohere API Key</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Please enter your Cohere API key to use the keyword generator. You can
          get your API key from the{" "}
          <a
            href="https://dashboard.cohere.ai/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Cohere Dashboard
          </a>
          .
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Cohere API key"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Your API key is stored securely in your browser and is only used to
            make requests to Cohere.
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApiKeyModal;
