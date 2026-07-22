"use client";

import { useGetSurveyQuery } from "@/src/redux/services/surveyApi";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderPinwheel,
  MessageSquareText,
  Sparkles,
  Tags,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import QuestionForm from "./question-form";
import QuestionList from "./question-list";
import { Button } from "@/src/components/ui/button";
import { Eye } from "lucide-react";

type SurveyDetail = {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  slug?: string;
  allowMultipleResponses?: boolean;
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
  startsAt?: string | null;
  endsAt?: string | null;
  questions?: Array<{
    id?: string;
    title?: string;
    description?: string | null;
    questionText?: string;
    text?: string;
    prompt?: string;
    type?: string;
    required?: boolean;
    placeholder?: string | null;
    options?:
      | Array<{ id?: string; label?: string; value?: string; order?: number }>
      | string[];
  }>;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not set";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";

  return date.toLocaleString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getStatusClasses = (status?: string) => {
  switch (status) {
    case "PUBLISHED":
      return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30";
    case "CLOSED":
      return "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30";
    default:
      return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30";
  }
};

const SurveyDetails = () => {
  const params = useParams();
  const surveyId = params.id as string;
  const { data, isLoading, refetch } = useGetSurveyQuery(surveyId);

  const surveyData = data as { data?: SurveyDetail } | SurveyDetail | undefined;
  const survey =
    surveyData &&
    typeof surveyData === "object" &&
    "data" in surveyData &&
    surveyData.data
      ? surveyData.data
      : (surveyData as SurveyDetail | undefined);
  const questions = survey?.questions ?? [];

  const handleQuestionCreated = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <LoaderPinwheel className="h-10 w-10 animate-spin text-slate-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-none space-y-6">
        <section className="w-full overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.8)]">
          <div className="border-b border-white/10 bg-white/5 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Survey Overview
                </div>
                <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                  {survey?.title || "Untitled Survey"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  {survey?.description ||
                    "No description has been added for this survey yet."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full p-2 text-xs font-semibold ${getStatusClasses(survey?.status)}`}
                >
                  {survey?.status || "DRAFT"}
                </span>
                <span
                  className={`rounded-full p-2 text-xs font-semibold ${survey?.isPublic ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30" : "bg-slate-700/80 text-slate-300 ring-1 ring-slate-600"}`}
                >
                  {survey?.isPublic ? "PUBLIC" : "PRIVATE"}
                </span>
                <Link href={`/admin-dashboard/survey/${surveyId}/responses`}>
                  <Button variant="link" size="sm" className="h-8  cursor-pointer">
                    <Eye className="mr-2 h-4 w-4" />
                    See Responses
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid w-full gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <h2 className="text-lg font-semibold text-white">Survey Data</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={Tags}
                  label="Slug"
                  value={survey?.slug || "—"}
                />
                <InfoCard
                  icon={CheckCircle2}
                  label="Multiple Responses"
                  value={
                    survey?.allowMultipleResponses ? "Allowed" : "Not allowed"
                  }
                />
                <InfoCard
                  icon={CalendarDays}
                  label="Starts At"
                  value={formatDate(survey?.startsAt)}
                />
                <InfoCard
                  icon={Clock3}
                  label="Ends At"
                  value={formatDate(survey?.endsAt)}
                />
                <InfoCard
                  icon={FileText}
                  label="Created At"
                  value={formatDate(survey?.createdAt)}
                />
                <InfoCard
                  icon={MessageSquareText}
                  label="Updated At"
                  value={formatDate(survey?.updatedAt)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Questions</h2>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                  {questions.length} items
                </span>
              </div>

              <QuestionForm surveyId={surveyId} questionsLength={questions.length} onCreated={handleQuestionCreated} />

              <QuestionList questions={questions} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
    <p className="mt-2 text-sm font-medium text-white">{value}</p>
  </div>
);

export default SurveyDetails;
