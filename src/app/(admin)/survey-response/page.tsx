"use client";

import { Button } from "@/src/components/ui/button";
import { useGetPublicSurveyQuery, useSubmitSurveyMutation } from "@/src/redux/services/surveyApi";
import { LoaderPinwheel, Sparkles, CheckCircle2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type QuestionOption = {
  id?: string;
  label?: string;
  value?: string;
  order?: number;
};

type SurveyQuestion = {
  id?: string;
  title?: string;
  description?: string | null;
  type?: string;
  required?: boolean;
  placeholder?: string | null;
  options?: QuestionOption[];
};

type PublicSurveyResponse = {
  id?: string;
  title?: string;
  description?: string;
  slug?: string;
  status?: string;
  questions?: SurveyQuestion[];
};

type FormValues = Record<string, string | string[]>;

const SurveyResponsePage = () => {
  const slug = "ai-users-1784658528203";
  const { data, isLoading } = useGetPublicSurveyQuery(slug);
  const [submitSurvey, { isLoading: isSubmitting }] = useSubmitSurveyMutation();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const survey = useMemo(() => {
    const payload = data as { data?: PublicSurveyResponse } | PublicSurveyResponse | undefined;
    if (payload && typeof payload === "object" && "data" in payload && payload.data) {
      return payload.data;
    }
    return payload as PublicSurveyResponse | undefined;
  }, [data]);

  const questions = survey?.questions ?? [];

  const onSubmit = async (values: FormValues) => {
    try {
      const payload: Array<{ questionId: string; value: string | string[] | number }> = [];

      questions.forEach((question) => {
        const questionId = question.id;
        if (!questionId) return;

        const rawValue = values[questionId];
        const type = (question.type || "TEXT").toUpperCase();

        if (rawValue === undefined || rawValue === null) {
          return;
        }

        if (type === "CHECKBOX") {
          const selectedValues = Array.isArray(rawValue)
            ? rawValue.filter((value): value is string => typeof value === "string" && value.length > 0)
            : [];

          if (selectedValues.length > 0) {
            payload.push({ questionId, value: selectedValues });
          }
          return;
        }

        if (type === "RADIO" || type === "SELECT") {
          if (typeof rawValue === "string" && rawValue.length > 0) {
            payload.push({ questionId, value: rawValue });
          }
          return;
        }

        if (type === "NUMBER" || type === "RATING") {
          const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue);
          if (Number.isFinite(numericValue)) {
            payload.push({ questionId, value: numericValue });
          }
          return;
        }

        if (typeof rawValue === "string") {
          if (rawValue.trim().length > 0) {
            payload.push({ questionId, value: rawValue });
          }
          return;
        }

        if (Array.isArray(rawValue)) {
          const stringValues = rawValue.filter((value): value is string => typeof value === "string");
          if (stringValues.length > 0) {
            payload.push({ questionId, value: stringValues });
          }
          return;
        }

        payload.push({ questionId, value: String(rawValue) });
      });

      await submitSurvey({ slug, body: { answers: payload } }).unwrap();
      toast.success("Your response has been submitted!");
      reset();
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting your response.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 text-slate-100">
        <LoaderPinwheel className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
        <div className="w-full max-w-2xl rounded-[28px] border border-emerald-500/20 bg-slate-900/80 p-8 text-center shadow-2xl">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <h1 className="mt-4 text-3xl font-semibold">Thanks for responding!</h1>
          <p className="mt-3 text-slate-400">Your answers have been recorded successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.85)] backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            Public Survey
          </div>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{survey?.title || "Survey"}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {survey?.description || "Please complete the survey below with your honest response."}
          </p>
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-[30px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.85)] backdrop-blur sm:p-6">
          {questions.map((question, index) => {
            const type = (question?.type || "TEXT").toUpperCase();
            const isChoiceType = ["CHECKBOX", "RADIO", "SELECT"].includes(type);
            const isTextType = ["SHORT_TEXT", "LONG_TEXT", "TEXT"].includes(type);

            return (
              <div key={question.id || `${question.title || "question"}-${index}`} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {index + 1}. {question.title || question.description || "Untitled question"}
                    </p>
                    {question.description ? <p className="mt-1 text-sm text-slate-400">{question.description}</p> : null}
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    isChoiceType
                      ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30"
                      : isTextType
                        ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                        : "bg-slate-700/80 text-slate-300 ring-1 ring-slate-600"
                  }`}>
                    {type}
                  </span>
                </div>

                {isChoiceType ? (
                  <div className="mt-4 space-y-3">
                    {question.options?.map((option, optionIndex) => {
                      const optionValue = option.value || option.label || `option-${optionIndex + 1}`;
                      const optionLabel = option.label || option.value || `Option ${optionIndex + 1}`;

                      if (type === "CHECKBOX") {
                        return (
                          <label key={option.id || `${question.id}-${optionIndex}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                            <input
                              type="checkbox"
                              value={optionValue}
                              {...register(`${question.id}` as string, { required: question.required })}
                              className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500"
                            />
                            <span>{optionLabel}</span>
                          </label>
                        );
                      }

                      return (
                        <label key={option.id || `${question.id}-${optionIndex}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                          <input
                            type={type === "RADIO" ? "radio" : "radio"}
                            value={optionValue}
                            {...register(`${question.id}` as string, { required: question.required })}
                            className="h-4 w-4 border-slate-600 bg-slate-900 text-sky-500"
                          />
                          <span>{optionLabel}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : null}

                {isTextType ? (
                  <div className="mt-4">
                    <textarea
                      {...register(`${question.id}` as string, { required: question.required })}
                      placeholder={question.placeholder || "Type your response here..."}
                      rows={4}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isSubmitting} className="min-w-[180px]">
              {isSubmitting ? "Submitting..." : "Submit Responses"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyResponsePage;
