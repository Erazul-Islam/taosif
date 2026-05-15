import { LoginPayload, LoginResponse } from "@/src/types/type";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    getMe: builder.query<LoginResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<LoginResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
} = authApi;