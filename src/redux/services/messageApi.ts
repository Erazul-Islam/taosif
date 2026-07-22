import { MessagePayload, TResponse } from "@/src/types/type";
import { baseApi } from "./baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<TResponse<unknown>, MessagePayload>({
      query: (data) => ({
        url: "/message",
        method: "POST",
        body: data,
      }),
    }),
    getMessages: builder.query<TResponse<unknown>, void>({
      query: () => ({
        url: "/message",
        method: "GET",
      }),
    }),
    sendNotification : builder.mutation({
      query: (data) => ({
        url: "/message/notify",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const { useSendMessageMutation, useGetMessagesQuery } = messageApi;