"use client";

import { FormInput, FormSelect } from "@/src/components/form-elements";
import { Button } from "@/src/components/ui/button";
import { useCreateQuestionMutation } from "@/src/redux/services/surveyApi";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

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

type QuestionFormValues = {
  title: string;
  description: string;
  type: string;
  required: string;
  order: string;
  placeholder: string;
};

type QuestionFormProps = {
  surveyId: string;
  questionsLength: number;
  onCreated: () => void;
};

const QuestionForm = ({ surveyId, questionsLength, onCreated }: QuestionFormProps) => {
  const [createQuestion, { isLoading: isCreatingQuestion }] = useCreateQuestionMutation();
  const [optionDrafts, setOptionDrafts] = useState([{ label: "", value: "" }]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuestionFormValues>();

  const selectedType = (watch("type") || "SHORT_TEXT").toUpperCase();
  const showOptions = ["RADIO", "CHECKBOX", "SELECT"].includes(selectedType);

  useEffect(() => {
    if (!showOptions) {
      setOptionDrafts([{ label: "", value: "" }]);
    }
  }, [showOptions]);

  const addOptionField = () => {
    setOptionDrafts((prev) => [...prev, { label: "", value: "" }]);
  };

  const updateOptionField = (index: number, field: "label" | "value", value: string) => {
    setOptionDrafts((prev) => prev.map((option, optionIndex) => (optionIndex === index ? { ...option, [field]: value } : option)));
  };

  const removeOptionField = (index: number) => {
    setOptionDrafts((prev) => prev.filter((_, optionIndex) => optionIndex !== index));
  };

  const onSubmit: SubmitHandler<QuestionFormValues> = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description || null,
        type: selectedType,
        required: formData.required === "true",
        order: Number(formData.order || questionsLength + 1),
        placeholder: formData.placeholder || null,
        options: showOptions
          ? optionDrafts
              .filter((option) => option.label.trim() || option.value.trim())
              .map((option, index) => ({
                label: option.label.trim() || option.value.trim(),
                value: option.value.trim() || option.label.trim(),
                order: index + 1,
              }))
          : undefined,
      };

      await createQuestion({ surveyId, data: payload }).unwrap();
      toast.success("Question created successfully");
      reset();
      setOptionDrafts([{ label: "", value: "" }]);
      onCreated();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create question");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Plus className="h-4 w-4" />
        Add Question
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <FormInput
          name="title"
          label="Question Title"
          placeholder="Enter your question"
          register={register}
          required
          error={errors.title}
        />

        <FormSelect
          name="type"
          label="Question Type"
          register={register}
          options={[
            { label: "Short Text", value: "SHORT_TEXT" },
            { label: "Long Text", value: "LONG_TEXT" },
            { label: "Radio", value: "RADIO" },
            { label: "Checkbox", value: "CHECKBOX" },
            { label: "Select", value: "SELECT" },
          ]}
          error={errors.type}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <FormInput
          name="description"
          label="Description"
          placeholder="Optional details"
          register={register}
        />

        <FormInput
          name="placeholder"
          label="Placeholder"
          placeholder="Optional helper text"
          register={register}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <FormSelect
          name="required"
          label="Required"
          register={register}
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          error={errors.required}
        />

        <FormInput
          name="order"
          label="Order"
          placeholder="Question order"
          type="number"
          register={register}
          error={errors.order}
        />
      </div>

      {showOptions ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Options</p>
            <Button type="button" variant="outline" size="sm" onClick={addOptionField}>
              Add Option
            </Button>
          </div>

          <div className="mt-3 space-y-2">
            {optionDrafts.map((option, index) => (
              <div key={index} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                <FormInput
                  name={`option-label-${index}`}
                  label={`Option ${index + 1} Label`}
                  placeholder="Label"
                  value={option.label}
                  onChange={(event) => updateOptionField(index, "label", event.target.value)}
                />
                <FormInput
                  name={`option-value-${index}`}
                  label="Value"
                  placeholder="Value"
                  value={option.value}
                  onChange={(event) => updateOptionField(index, "value", event.target.value)}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => removeOptionField(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={isCreatingQuestion}>
          {isCreatingQuestion ? "Creating..." : "Create Question"}
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
