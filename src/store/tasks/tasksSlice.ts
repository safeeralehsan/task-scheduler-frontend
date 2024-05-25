import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from ".."
import { Task, TaskDetails } from "../../lib/types"
import { Tasks } from "../../services/api/task"
import { TaskStatus } from "../../lib/constants"

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
        listFetched: (state, action: PayloadAction<Task[]>) => {
            return {
                ...state,
                taskList: action.payload
            }
        },
        created: (state, action: PayloadAction<Task>) => {
            state.taskList.push(action.payload)
        },
        complete: (state, action: PayloadAction<string>) => {
            const index = state.taskList.findIndex(task => task.id === action.payload)
            if (index > -1) {
                state.taskList[index].status = TaskStatus.COMPLETE as keyof typeof TaskStatus
            }
        }
    }
})

export const { created, listFetched, complete } = tasksSlice.actions

export const fetchTasks = (userId: string) => async (dispatch: AppDispatch) => {
    const response = await Tasks.fetchTasks(userId)
    dispatch(listFetched(response.data as Task[]))
}

export const createTask = (taskDetails: TaskDetails) => async (dispatch: AppDispatch) => {
    const response = await Tasks.createTask(taskDetails)
    dispatch(created(response.data as Task))
}

export const completeTask = (taskId: string) => (dispatch: AppDispatch) => {
    dispatch(complete(taskId))
}

export default tasksSlice.reducer