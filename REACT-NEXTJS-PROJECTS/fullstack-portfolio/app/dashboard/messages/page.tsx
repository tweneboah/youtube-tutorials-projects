"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contact");
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.role === "admin") {
      fetchMessages();
    }
  }, [session]);

  const handleToggleRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      const updatedMessage = await response.json();
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: !msg.read } : msg))
      );
      toast.success("Message updated");
    } catch (error) {
      toast.error("Failed to update message");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DEFF80] via-[#e6ffb3] to-[#DEFF80]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A3AFF]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEFF80] via-[#e6ffb3] to-[#DEFF80]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2D1B69] to-[#4A3AFF] bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-[#2D1B69]/70 mt-2">
            Manage your incoming messages and inquiries
          </p>
        </div>

        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
              <div className="text-[#2D1B69]/40 mb-6">
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2D1B69] mb-3">
                No Messages Yet
              </h3>
              <p className="text-[#2D1B69]/70 text-lg">
                When someone sends you a message, it will appear here.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className={`group bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] ${
                  !message.read ? "border-l-4 border-[#4A3AFF]" : ""
                }`}
              >
                <div className="p-4 md:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-[#2D1B69] group-hover:text-[#4A3AFF] transition-colors duration-300">
                        {message.name}
                      </h2>
                      <a
                        href={`mailto:${message.email}`}
                        className="text-[#4A3AFF] hover:text-[#8257FF] text-sm font-medium transition-colors duration-300 break-all"
                      >
                        {message.email}
                      </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleRead(message._id)}
                          className="p-2 rounded-lg bg-[#2D1B69]/5 hover:bg-[#4A3AFF]/10 text-[#2D1B69] hover:text-[#4A3AFF] transition-all duration-300"
                          title={
                            message.read ? "Mark as unread" : "Mark as read"
                          }
                        >
                          {message.read ? (
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
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          ) : (
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(message._id)}
                          className="p-2 rounded-lg bg-[#2D1B69]/5 hover:bg-red-500/10 text-[#2D1B69] hover:text-red-500 transition-all duration-300"
                          title="Delete message"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm font-medium text-[#2D1B69] bg-[#2D1B69]/5 px-3 py-1.5 rounded-lg">
                        {format(new Date(message.createdAt), "PPpp")}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#2D1B69] whitespace-pre-wrap text-sm md:text-base">
                    {message.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
