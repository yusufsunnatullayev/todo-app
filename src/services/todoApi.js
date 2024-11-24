import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../constants";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    todos: builder.query({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    todoDetail: builder.query({
      query: (id) => `/todos/${id}`,
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useTodoDetailQuery,
} = todoApi;
