import React from "react";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";

enum SurveyStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CLOSED = "CLOSED",
}

type Survey = {
  id: string;
  title: string;
  description?: string;
  status?: SurveyStatus | string;
  startsAt?: string;
  endAt?: string;
};

const statusStyles: Record<
  SurveyStatus,
  { badgeClass: string; barClass: string }
> = {
  [SurveyStatus.PUBLISHED]: {
    badgeClass: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30",
    barClass: "bg-emerald-400",
  },
  [SurveyStatus.DRAFT]: {
    badgeClass: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30",
    barClass: "bg-amber-400",
  },
  [SurveyStatus.CLOSED]: {
    badgeClass: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30",
    barClass: "bg-sky-400",
  },
};

const getStatusStyle = (status?: SurveyStatus | string) => {
  const normalizedStatus = status?.toUpperCase();

  if (normalizedStatus === SurveyStatus.PUBLISHED) {
    return statusStyles[SurveyStatus.PUBLISHED];
  }

  if (normalizedStatus === SurveyStatus.CLOSED) {
    return statusStyles[SurveyStatus.CLOSED];
  }

  return statusStyles[SurveyStatus.DRAFT];
};

const formatDate = (value?: string) => {
  if (!value) return "Not set";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const SurveyCard = ({ surveys }: { surveys: Survey[] }) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {surveys.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">
          No surveys available yet.
        </div>
      ) : (
        surveys.map((survey) => {
          const style = getStatusStyle(survey.status);

          return (
            <Link key={survey.id} href={`/admin-dashboard/survey/${survey.id}`}>
              <div
                key={survey.id}
                className="group relative m-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-5 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.72)]"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${style.barClass}`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {survey.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-300">
                      {survey.description ||
                        "No description provided for this survey."}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${style.badgeClass}`}
                  >
                    {survey.status || SurveyStatus.DRAFT}
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-200">
                      Survey Overview
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-400" />
                    <span>Starts: {formatDate(survey.startsAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                    <span>Ends: {formatDate(survey.endAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default SurveyCard;
