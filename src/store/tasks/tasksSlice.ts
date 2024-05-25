import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from ".."
import { Task } from "../../lib/types"

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
        created: (state, action: PayloadAction<Task>) => {
            state.taskList.push(action.payload)
        }
    }
})

export const { created } = tasksSlice.actions

export const createTask = (task: Task) => (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(created(task))
    }, 1000)
}

export default tasksSlice.reducer