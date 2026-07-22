import React from "react";

export type SurveyQuestion = {
  id?: string;
  title?: string;
  description?: string | null;
  questionText?: string;
  text?: string;
  prompt?: string;
  type?: string;
  required?: boolean;
  placeholder?: string | null;
  options?: Array<{ id?: string; label?: string; value?: string; order?: number }> | string[];
};

type QuestionListProps = {
  questions: SurveyQuestion[];
};

const QuestionList = ({ questions }: QuestionListProps) => {
  return (
    <div className="mt-4 space-y-3">
      {questions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-400">
          No questions added yet.
        </div>
      ) : (
        questions.map((question, index) => {
          const questionText = question?.title || question?.questionText || question?.text || question?.prompt || `Question ${index + 1}`;
          const optionCount = Array.isArray(question?.options) ? question.options.length : 0;
          const type = (question?.type || "TEXT").toUpperCase();
          const isChoiceType = ["CHECKBOX", "RADIO", "SELECT"].includes(type);
          const isTextType = ["SHORT_TEXT", "LONG_TEXT", "TEXT"].includes(type);

          return (
            <div key={question?.id || `${questionText}-${index}`} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">{index + 1}. {questionText}</p>
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

                  {question?.description ? <p className="mt-2 text-sm text-slate-400">{question.description}</p> : null}
                  {question?.required ? <p className="mt-2 text-xs text-rose-300">Required</p> : null}
                </div>

                {optionCount > 0 ? (
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                    {optionCount} options
                  </span>
                ) : null}
              </div>

              {isChoiceType && Array.isArray(question.options) && question.options.length > 0 ? (
                <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Options</p>
                  <div className="flex flex-wrap gap-2">
                    {question.options.map((option: { id?: string; label?: string; value?: string; order?: number } | string, optionIndex: number) => {
                      const optionText = typeof option === "string" ? option : option?.label || option?.value || `Option ${optionIndex + 1}`;

                      return (
                        <div key={typeof option === "string" ? `${question.id}-${optionIndex}` : option?.id || `${question.id}-${optionIndex}`} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-slate-200">
                          {optionText}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {isTextType ? (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-400">
                  {type === "SHORT_TEXT" || type === "TEXT"
                    ? "Short text response expected"
                    : "Long text response expected"}
                </div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export default QuestionList;
