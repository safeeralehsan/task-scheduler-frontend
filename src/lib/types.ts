import { TaskStatus } from "./constants"

export type Task = {
    title: string,
    description: string,
    scheduledTime: Date,
    status: keyof typeof TaskStatus
}
