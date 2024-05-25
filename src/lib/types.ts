import { TaskStatus } from "./constants"

export type Task = {
    id: string,
    title: string,
    description: string,
    scheduledTime: Date,
    status: keyof typeof TaskStatus
}

export type TaskDetails = {
    title: string,
    description: string,
    scheduledTime: Date,
    status: keyof typeof TaskStatus
}
