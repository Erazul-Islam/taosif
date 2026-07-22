"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAllSurveysQuery, useCreateSurveyMutation } from "@/src/redux/services/surveyApi";
import { LoaderPinwheel, Plus } from "lucide-react";
import SurveyCard from "./survey-card";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { FormInput, FormSelect } from "@/src/components/form-elements";
import { toast } from "sonner";

interface SurveyFormData {
  title: string;
  description: string;
  status: string;
  isPublic: string;
  allowMultipleResponses: string;
  startsAt: string;
  endsAt: string;
}

const SurveyPage = () => {
  const { data, isLoading, refetch } = useGetAllSurveysQuery({});
  const [createSurvey, { isLoading: isCreating }] = useCreateSurveyMutation();
  const [open, setOpen] = useState(false);
  const surveys = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SurveyFormData>();

  const onSubmit: SubmitHandler<SurveyFormData> = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        isPublic: formData.isPublic === "true",
        allowMultipleResponses: formData.allowMultipleResponses === "true",
        startsAt: formData.startsAt ? new Date(formData.startsAt).toISOString() : null,
        endsAt: formData.endsAt ? new Date(formData.endsAt).toISOString() : null,
      };

      await createSurvey(payload).unwrap();
      toast.success("Survey created successfully");
      reset();
      setOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create survey");
    }
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Surveys</h2>
          <p className="mt-1 text-sm text-slate-400">Create and manage your surveys from here.</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 cursor-pointer" />
              Add Survey
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-950 text-slate-100 sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Survey</DialogTitle>
              <DialogDescription className="text-slate-400">
                Fill in the details below to create a new survey.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Enter survey title"
                  register={register}
                  required
                  error={errors.title}
                />

                <FormSelect
                  name="status"
                  label="Status"
                  register={register}
                  options={[
                    { label: "Draft", value: "DRAFT" },
                    { label: "Published", value: "PUBLISHED" },
                    { label: "Closed", value: "CLOSED" },
                  ]}
                  error={errors.status}
                />
              </div>

              <FormInput
                name="description"
                label="Description"
                placeholder="Enter survey description"
                register={register}
                required
                error={errors.description}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormSelect
                  name="isPublic"
                  label="Visibility"
                  register={register}
                  options={[
                    { label: "Public", value: "true" },
                    { label: "Private", value: "false" },
                  ]}
                  error={errors.isPublic}
                />

                <FormSelect
                  name="allowMultipleResponses"
                  label="Allow Multiple Responses"
                  register={register}
                  options={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                  error={errors.allowMultipleResponses}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  name="startsAt"
                  label="Starts At"
                  placeholder="Select date"
                  type="datetime-local"
                  register={register}
                  error={errors.startsAt}
                />

                <FormInput
                  name="endsAt"
                  label="Ends At"
                  placeholder="Select date"
                  type="datetime-local"
                  register={register}
                  error={errors.endsAt}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Survey"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex min-h-screen w-full items-center justify-center">
          <LoaderPinwheel className="h-10 w-10 animate-spin text-slate-300" />
        </div>
      ) : (
        <SurveyCard surveys={surveys} />
      )}
    </div>
  );
};

export default SurveyPage;
