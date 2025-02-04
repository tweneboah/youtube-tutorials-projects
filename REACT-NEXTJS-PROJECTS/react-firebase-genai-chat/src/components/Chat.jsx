import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../config/firebase";
import { model, initializeModel } from "../config/gemini";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [indexReady, setIndexReady] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    const initializeChat = async () => {
      const messagesRef = collection(db, "messages");
      const userMessagesQuery = query(
        messagesRef,
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(userMessagesQuery);

      if (snapshot.empty) {
        await addDoc(messagesRef, {
          text: `Hello there! I'm here to help you with your programming questions. Feel free to ask me anything related to programming, and I'll do my best to assist you.

Here are some examples of questions you can ask:

- How to write a loop in Python
- What is the difference between a list and a tuple in Python
- How to use regular expressions in JavaScript

I can also help you with more specific questions, such as:

- How to solve the FizzBuzz problem in Java
- How to implement a binary search tree in C++
- How to use a neural network to classify images in Python

I'm particularly good at:
- Explaining complex programming concepts
- Debugging code issues
- Providing code examples with explanations
- Suggesting best practices and design patterns

Just let me know what you're working on, and I'll do my best to help!`,
          timestamp: serverTimestamp(),
          role: "ai",
          userId: user.uid,
          isWelcomeMessage: true,
        });
      }
    };

    initializeChat();

    const q = query(
      collection(db, "messages"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
        setIndexReady(true);
      },
      error: (error) => {
        console.error("Error fetching messages:", error);
        setIndexReady(true);
      },
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const userMessageDoc = await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: serverTimestamp(),
        role: "user",
        userId: user.uid,
      });

      const currentModel = initializeModel();
      if (!currentModel) {
        throw new Error("API key not found. Please set up your API key.");
      }

      const result = await currentModel.generateContent(
        `You are a helpful programming assistant. Please provide well-formatted responses with code examples when appropriate. 
         User question: ${newMessage}`
      );
      const response = result.response.text();

      await addDoc(collection(db, "messages"), {
        text: response,
        timestamp: serverTimestamp(),
        role: "ai",
        userId: user.uid,
        replyTo: userMessageDoc.id,
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Error: " + error.message,
          role: "ai",
          userId: user.uid,
        },
      ]);
    } finally {
      setNewMessage("");
      setIsLoading(false);
    }
  };

  const MessageContent = ({ text }) => {
    return (
      <ReactMarkdown
        className="text-sm leading-relaxed"
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-3 list-disc pl-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal pl-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold mb-2">{children}</h3>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-blue-500 hover:text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-3 italic">
              {children}
            </blockquote>
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="rounded-lg overflow-hidden my-3">
                <div className="bg-gray-800 px-4 py-2 text-xs text-gray-200 uppercase">
                  {match[1]}
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: "0 0 0.5rem 0.5rem",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  const LoadingDots = () => (
    <div className="flex space-x-1 items-center justify-center">
      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                AI Chat Assistant
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your coding companion
              </p>
            </div>
          </div>
        </div>
      </div>

      {!indexReady ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl max-w-md w-full mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Setting up the chat... This may take a few moments.
            </p>
            <LoadingDots />
          </div>
        </div>
      ) : (
        <>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-slideIn`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-lg transition-transform hover:scale-[1.02] ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-4"
                        : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 mr-4"
                    }`}
                  >
                    <div
                      className={`text-sm mb-1 flex items-center space-x-2 ${
                        message.role === "user"
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {message.role === "user" ? (
                        <>
                          <span>You</span>
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>AI Assistant</span>
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      )}
                    </div>
                    <div
                      className={
                        message.role === "user"
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-200"
                      }
                    >
                      <MessageContent text={message.text} />
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="max-w-[85%] sm:max-w-[75%] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-5 py-4 border border-gray-100 dark:border-gray-700/50 mr-4 shadow-lg">
                    <div className="text-sm mb-1 flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <span>AI Assistant</span>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <LoadingDots />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask a programming question..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
                           text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                           text-white font-medium focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                           disabled:cursor-not-allowed transition-all duration-200
                           dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl
                           transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <span className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>Send</span>
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
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
