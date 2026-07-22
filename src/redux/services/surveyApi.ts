import { baseApi } from "./baseApi";

export const surveyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Survey Endpoints

        createSurvey: builder.mutation({
            query: (data) => ({
                url: "/surveys",
                method: "POST",
                body: data,
            }),
        }),

        getAllSurveys: builder.query({
            query: () => ({
                url: "/surveys",
                method: "GET",
            }),
        }),

        getSurvey: builder.query({
            query: (surveyId: string) => ({
                url: `/surveys/${surveyId}`,
                method: "GET",
            }),
        }),

        updateSurvey: builder.mutation({
            query: ({ surveyId, data }) => ({
                url: `/surveys/${surveyId}`,
                method: "PATCH",
                body: data,
            }),
        }),

        deleteSurvey: builder.mutation({
            query: (surveyId: string) => ({
                url: `/surveys/${surveyId}`,
                method: "DELETE",
            }),
        }),

        // question endpoints

        createQuestion: builder.mutation({
            query: ({ data, surveyId }) => ({
                url: `/questions/${surveyId}`,
                method: "POST",
                body: data,
            }),
        }),

        getAllQuestions: builder.query({
            query: (surveyId: string) => ({
                url: `/questions/${surveyId}`,
                method: "GET",
            }),
        }),

        deleteQuestion: builder.mutation({
            query: (questionId: string) => ({
                url: `/questions/${questionId}`,
                method: "DELETE",
            }),
        }),

        // response endpoints

        submitResponse: builder.mutation({
            query: ({ slug, data }) => ({
                url: `public/surveys/${slug}/submit`,
                method: "POST",
                body: data,
            }),
        }),

        getAllResponses: builder.query({
            query: (surveyId: string) => ({
                url: `surveys/${surveyId}/responses`,
                method: "GET",
            }),
        }),

        getPublicSurveyResponse: builder.query({
            query: (slug: string) => ({
                url: `public/surveys/${slug}`,
                method: "GET",
            }),
        }),

        // Public Survey Endpoints

        getPublicSurvey: builder.query({
            query: (slug: string) => ({
                url: `/public/surveys/${slug}`,
                method: "GET",
            }),
        }),

        submitSurvey: builder.mutation({
            query: ({ slug, body }) => ({
                url: `/public/surveys/${slug}/submit`,
                method: "POST",
                body,
            }),
        }),

        getSurveyResponses: builder.query({
            query: (surveyId: string) => ({
                url: `/surveys/${surveyId}/responses`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateSurveyMutation,
    useCreateQuestionMutation,
    useGetAllSurveysQuery,
    useGetSurveyQuery,
    useGetPublicSurveyQuery,
    useSubmitSurveyMutation,
    useGetSurveyResponsesQuery,
    useGetPublicSurveyResponseQuery,
    useUpdateSurveyMutation,
    useDeleteSurveyMutation,
} = surveyApi;