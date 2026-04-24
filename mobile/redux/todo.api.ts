import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "../config/env"
import { CREATE_TODO_REQUSET, CREATE_TODO_RESPONSE, DELETE_TODO_REQUSET, DELETE_TODO_RESPONSE, GET_TODO_REQUSET, GET_TODO_RESPONSE, UPDATE_TODO_REQUSET, UPDATE_TODO_RESPONSE } from "../types/Todo"

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/todo` }),
    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query<GET_TODO_RESPONSE, GET_TODO_REQUSET>({
                query: () => {
                    return {
                        url: "/read",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            addTodo: builder.mutation<CREATE_TODO_RESPONSE, CREATE_TODO_REQUSET>({
                query: userData => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            updateTodo: builder.mutation<UPDATE_TODO_RESPONSE, UPDATE_TODO_REQUSET>({
                query: userData => {
                    return {
                        url: "/update/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            deleteTodo: builder.mutation<DELETE_TODO_RESPONSE, DELETE_TODO_REQUSET>({
                query: userData => {
                    return {
                        url: "/delete/" + userData._id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation, useLazyGetTodosQuery } = todoApi
