import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from ".."
import { Task, TaskDetails } from "../../lib/types"
import { Tasks } from "../../services/api/task"

interface TasksState {
    taskList: Task[]
}

const initialState: TasksState = {
    taskList: []
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchList: (state, action: PayloadAction<Task[]>) => {
            return {
                ...state,
                taskList: action.payload
            }
        },
        created: (state, action: PayloadAction<Task>) => {
            state.taskList.push(action.payload)
        }
    }
})

export const { created, fetchList } = tasksSlice.actions

export const fetchTasks = (userId: string) => async (dispatch: AppDispatch) => {
    const response = await Tasks.fetchTasks(userId)
    dispatch(fetchList(response.data as Task[]))
}

export const createTask = (taskDetails: TaskDetails) => async (dispatch: AppDispatch) => {
    const response = await Tasks.createTask(taskDetails)
    dispatch(created(response.data as Task))
}

export default tasksSlice.reducer