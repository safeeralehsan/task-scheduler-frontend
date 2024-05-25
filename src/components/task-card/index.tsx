import { format } from "date-fns"
import { Task } from "../../lib/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { TaskStatus, TaskStatusLabel } from "../../lib/constants"

interface TaskCardProps {
    task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <Card className="w-full mt-4">
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col text-sm">
                        <span className="font-medium">Scheduled Time</span>
                        <span>{format(new Date(task.scheduledTime), 'dd MMM,yyyy HH:mm:ss')}</span>
                    </div>
                    <div className="flex flex-col text-sm">
                        <span className="font-medium">Status</span>
                        <span
                            className={
                                task.status === TaskStatus.NOT_STARTED
                                    ? "text-[10px] bg-red-400 text-white w-fit px-2 rounded-md" 
                                    : "text-[10px] bg-green-400 text-white w-fit px-2 rounded-md"
                            }
                        >
                            {TaskStatusLabel[task.status]}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="destructive" size="sm">Delete Task</Button>
            </CardFooter>
        </Card>
    )
}

export default TaskCard