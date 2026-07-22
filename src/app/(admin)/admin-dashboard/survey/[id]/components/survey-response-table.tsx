"use client";

import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

type SurveyAnswer = {
  questionId?: string;
  value?: unknown;
  question?: {
    title?: string;
  };
};

type SurveyResponseRecord = {
  id?: string;
  createdAt?: string;
  submittedAt?: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  answers?: SurveyAnswer[];
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatAnswerValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "—";
};

const isProfileField = (title?: string) => {
  const normalized = title?.toLowerCase() ?? "";
  return normalized.includes("name") || normalized.includes("gender") || normalized.includes("university");
};

const getProfileLabel = (title?: string) => {
  if (!title) return "Other";

  const normalized = title.toLowerCase();
  if (normalized.includes("name")) return "Name";
  if (normalized.includes("gender")) return "Gender";
  if (normalized.includes("university")) return "University";

  return title;
};

const SurveyResponseTable = ({ responses }: { responses: SurveyResponseRecord[] }) => {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)]">
      <div className="border-b border-white/10 bg-slate-950/70 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Submission details</h3>
            <p className="text-sm text-slate-400">
              Clear, structured rows for each response and its key information.
            </p>
          </div>
          <Badge variant="secondary" className="w-fit border border-sky-500/20 bg-sky-500/10 text-sky-200">
            {responses.length} {responses.length === 1 ? "submission" : "submissions"}
          </Badge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-950/70 hover:bg-slate-950/70">
              <TableHead className="w-[220px] px-4 py-3 text-sm font-semibold text-slate-300">Submitted</TableHead>
              <TableHead className="w-[220px] px-4 py-3 text-sm font-semibold text-slate-300">Profile</TableHead>
              <TableHead className="min-w-[320px] px-4 py-3 text-sm font-semibold text-slate-300">Responses</TableHead>
              <TableHead className="w-[240px] px-4 py-3 text-sm font-semibold text-slate-300">Device / IP</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {responses.map((response) => {
              const answers = response.answers ?? [];
              const profileAnswers = answers.filter((answer) => isProfileField(answer.question?.title));
              const otherAnswers = answers.filter((answer) => !isProfileField(answer.question?.title));

              return (
                <TableRow
                  key={response.id || `response-${response.submittedAt}`}
                  className="border-white/10 bg-slate-900/50 align-top hover:bg-slate-800/70"
                >
                  <TableCell className="px-4 py-4 align-top text-sm text-slate-200">
                    <div className="space-y-2">
                      <div className="font-semibold text-white">{formatDate(response.submittedAt)}</div>
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {response.createdAt ? "Received" : "Submitted"}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4 align-top text-sm text-slate-300">
                    {profileAnswers.length > 0 ? (
                      <div className="space-y-2">
                        {profileAnswers.map((answer, index) => (
                          <div key={`${response.id || "response"}-profile-${index}`} className="rounded-xl border border-sky-500/20 bg-sky-500/10 px-2.5 py-2">
                            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
                              {getProfileLabel(answer.question?.title)}
                            </div>
                            <div className="mt-1 font-medium text-white">
                              {formatAnswerValue(answer.value)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">No profile info</div>
                    )}
                  </TableCell>

                  <TableCell className="px-4 py-4 align-top text-sm text-slate-300">
                    {otherAnswers.length > 0 ? (
                      <div className="space-y-2">
                        {otherAnswers.slice(0, 3).map((answer, index) => (
                          <div key={`${response.id || "response"}-answer-${index}`} className="rounded-xl border border-white/10 bg-slate-800/70 px-2.5 py-2">
                            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
                              {answer.question?.title || `Answer ${index + 1}`}
                            </div>
                            <div className="mt-1 line-clamp-2 text-sm text-slate-200">
                              {formatAnswerValue(answer.value)}
                            </div>
                          </div>
                        ))}
                        {otherAnswers.length > 3 && (
                          <div className="text-xs text-slate-500">
                            +{otherAnswers.length - 3} more answers
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">No additional answers</div>
                    )}
                  </TableCell>

                  <TableCell className="px-4 py-4 align-top text-sm text-slate-300">
                    <div className="rounded-xl border border-white/10 bg-slate-800/70 px-2.5 py-2">
                      <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Device</div>
                      <div className="mt-1 font-medium text-white" title={response.userAgent || "Unknown device"}>
                        {response.userAgent || "Unknown device"}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {response.ipAddress || "No IP recorded"}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SurveyResponseTable;
