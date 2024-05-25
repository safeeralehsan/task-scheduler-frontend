import { get, post } from ".";
import { TaskDetails } from "../../lib/types";

export const Tasks = {
    fetchTasks: (userId: string) => 
        get(`/task`, { params: { userId }}),
    createTask: (taskDetails: TaskDetails) => 
        post('/task', taskDetails) 
}