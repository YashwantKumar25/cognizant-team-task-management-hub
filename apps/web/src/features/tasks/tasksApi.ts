
import { createApi, fetchBaseQuery, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { Task, TaskCreate, TaskUpdate } from '@cognizant-team-task-management-hub/shared';


type ApiSuccess<T> = { success: true; data: T };
type ApiError = { success: false; error: { code: string; message: string; details?: unknown } };

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const rawBaseQuery = fetchBaseQuery({ baseUrl: `${baseUrl}/api` });

const unwrappedBaseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extra) => {
  const result = await rawBaseQuery(args, api, extra);
  if (result.error) return result;

  const data = result.data as ApiSuccess<unknown> | ApiError;
  if (data && (data as any).success === true) {
    return { data: (data as ApiSuccess<unknown>).data };
  }
  if (data && (data as any).success === false) {
    return { error: { status: 400, data: (data as ApiError).error } };
  }
  // Fallback if server ever returns raw data without envelope
  return { data: result.data };
};

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: unwrappedBaseQuery,
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    listTasks: builder.query<Task[], { q?: string } | void>({
      query: (args) => {
        const q = args && args.q ? `?q=${encodeURIComponent(args.q)}` : "";
        return `tasks${q}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((t) => ({ type: "Tasks" as const, id: t.id })),
              { type: "Tasks" as const, id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    createTask: builder.mutation<Task, TaskCreate>({
      query: (body) => ({ url: "tasks", method: "POST", body }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    updateTask: builder.mutation<Task, { id: string; patch: TaskUpdate }>({
      query: ({ id, patch }) => ({ url: `tasks/${id}`, method: "PATCH", body: patch }),
      invalidatesTags: (result) => (result ? [{ type: "Tasks", id: result.id }] : []),
    }),
    deleteTask: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
        headers: { "X-Task-Auth": import.meta.env.VITE_DELETE_TOKEN },
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const { useListTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;
