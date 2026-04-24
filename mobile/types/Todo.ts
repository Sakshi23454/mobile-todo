type TODO = {
    _id?: number,
    task: string,
    description: string,
    priority: string,
    user_id: number,
    complete?: boolean
}

export type GET_TODO_REQUSET = void
export type GET_TODO_RESPONSE = {
    message: string,
    result: TODO[]
}

export type GET_COMPLETED_TODO_REQUSET = void
export type GET_COMPLETED_TODO_RESPONSE = {
    message: string,
    result: TODO[]
}

export type CREATE_TODO_REQUSET = TODO
export type CREATE_TODO_RESPONSE = { message: string }

export type UPDATE_TODO_REQUSET = TODO
export type UPDATE_TODO_RESPONSE = { message: string }

export type DELETE_TODO_REQUSET = { _id: number }
export type DELETE_TODO_RESPONSE = { message: string }