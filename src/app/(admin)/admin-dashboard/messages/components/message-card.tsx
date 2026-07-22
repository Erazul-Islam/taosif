"use client";

import { Mail, Globe, Calendar, MessageSquare } from "lucide-react";

interface MessageCardProps {
  name: string;
  email: string;
  content: string;
  ip: string;
  createdAt: string;
}

export function MessageCard({
  name,
  email,
  content,
  ip,
  createdAt,
}: MessageCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Header Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mt-1"
        >
          <Mail size={16} />
          {email}
        </a>
      </div>

      {/* Content Section */}
      <div className="mb-4 p-4 bg-gray-50 rounded border border-gray-100">
        <div className="inline-flex items-center gap-2 mb-2 text-gray-600">
          <MessageSquare size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">
            Message
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>

      {/* Metadata Section */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-gray-400" />
          <span>{ip}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
}