"use client";

import { useGetMessagesQuery } from "@/src/redux/services/messageApi";
import { MessageCard } from "./components/message-card";
import { AlertCircle, Inbox } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  content: string;
  ip: string;
  createdAt: string;
}

const Page = () => {
  const { data, isLoading, error } = useGetMessagesQuery();

  const messages = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="">
      <div className=" mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Inbox className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          </div>
          <p className="text-gray-600">
            {messages.length > 0
              ? `${messages.length} ${messages.length === 1 ? "message" : "messages"} received`
              : "No messages yet"}
          </p>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">Failed to load messages</h3>
              <p className="text-red-700 text-sm">
                Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && messages.length === 0 && (
          <div className="text-center py-12">
            <Inbox className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 text-lg">No messages to display</p>
            <p className="text-gray-500 text-sm mt-1">
              Messages will appear here when they are received
            </p>
          </div>
        )}

        {/* Messages List */}
        {!isLoading && !error && messages.length > 0 && (
          <div className="space-y-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                name={message.name}
                email={message.email}
                content={message.content}
                ip={message.ip}
                createdAt={message.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;