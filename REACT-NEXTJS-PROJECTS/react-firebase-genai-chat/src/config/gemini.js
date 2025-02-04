import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  return localStorage.getItem("gemini_api_key");
};

export const initializeModel = () => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-pro" });
};

export const model = initializeModel();
