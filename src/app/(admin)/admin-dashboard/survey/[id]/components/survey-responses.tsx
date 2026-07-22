"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarClock, LoaderPinwheel, MessageSquareText, MonitorSmartphone, Rows3 } from "lucide-react";
import React from "react";
import { useGetSurveyResponsesQuery } from "@/src/redux/services/surveyApi";
import { Button } from "@/src/components/ui/button";
import SurveyResponseTable from "./survey-response-table";

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

type SurveyResponsesPayload =
  | SurveyResponseRecord[]
  | { data?: SurveyResponseRecord[] }
  | { responses?: SurveyResponseRecord[] };

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

const normalizeResponses = (payload: SurveyResponsesPayload | undefined) => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;

  if (typeof payload === "object") {
    if (Array.isArray((payload as { data?: SurveyResponseRecord[] }).data)) {
      return (payload as { data: SurveyResponseRecord[] }).data;
    }

    if (Array.isArray((payload as { responses?: SurveyResponseRecord[] }).responses)) {
      return (payload as { responses: SurveyResponseRecord[] }).responses;
    }
  }

  return [];
};

const SurveyResponses = () => {
  const params = useParams();
  const surveyId = params.id as string;
  const { data, isLoading, error } = useGetSurveyResponsesQuery(surveyId);
  console.log(data)
  const responses = normalizeResponses(data as SurveyResponsesPayload | undefined);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_40%),linear-gradient(135deg,_#020617,_#111827)] p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.8)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-300">
              <MessageSquareText className="h-3.5 w-3.5" />
              SURVEY RESPONSES
            </div>
            <h2 className="text-2xl font-semibold text-white">Response overview</h2>
            <p className="mt-1 text-sm text-slate-400">
              Review each submission with a clear, polished table view.
            </p>
          </div>

          <Link href={`/admin-dashboard/survey/${surveyId}`}>
            <Button variant="outline" className="w-full border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to survey
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Rows3 className="h-4 w-4 text-sky-400" />
              Total submissions
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{responses.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CalendarClock className="h-4 w-4 text-emerald-400" />
              Latest response
            </div>
            <p className="mt-3 text-base font-semibold text-white">
              {responses[0] ? formatDate(responses[0].createdAt) : "No data"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MonitorSmartphone className="h-4 w-4 text-violet-400" />
              Devices tracked
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">
              {responses.filter((response) => response.userAgent).length}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-[24px] border border-white/10 bg-slate-900/80">
            <LoaderPinwheel className="h-8 w-8 animate-spin text-slate-300" />
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-300">
            We could not load the responses right now. Please try again shortly.
          </div>
        ) : responses.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-900/80 p-10 text-center text-slate-400">
            No responses have been submitted for this survey yet.
          </div>
        ) : (
          <SurveyResponseTable responses={responses} />
        )}
      </div>
    </div>
  );
};

export default SurveyResponses;
