import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { TimePicker } from "../ui/time-picker"
import { Calendar } from "../ui/calendar"
import { cn } from "../../lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { TaskStatus } from "../../lib/constants"
import { useState } from "react"
import { Task } from "../../lib/types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { createTask } from "../../store/tasks/tasksSlice"

const FormSchema = z.object({
    title: z.string().min(5, { message: 'Task title is required and must be 5 characters long at least.'}),
    description : z.string().min(5, { message: 'Task description is required and must be 5 characters long at least.'}),
    scheduledTime: z.date()
})

const CreateTaskForm = () => {
    const [taskStatus, setTaskStatus] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const dispatch = useAppDispatch()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          title: '',
          description: '',
          scheduledTime: new Date()
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setIsCreating(true)
        if (!taskStatus) {
            toast({
              title: "Please select a task status",
              variant: "destructive"
            })
        }
        const task: Task = {
            ...data,
            status: taskStatus as keyof typeof TaskStatus
        }
        await dispatch(createTask(task))
        setIsCreating(false)
      }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="scheduledTime"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel className="text-left">Schedule Time</FormLabel>
                    <Popover>
                        <FormControl>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                                format(field.value, "PPP HH:mm:ss")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            </Button>
                        </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                        />
                        <div className="p-3 border-t border-border">
                            <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                            />
                        </div>
                        </PopoverContent>
                    </Popover>
                    </FormItem>
                )}
            />
            <Select value={taskStatus} onValueChange={value => setTaskStatus(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select task status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Task Status</SelectLabel>
                        <SelectItem value={TaskStatus.NOT_STARTED}>Not Started</SelectItem>
                        <SelectItem value={TaskStatus.COMPLETE}>Complete</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button type="submit" className="w-full" disabled={isCreating}>Submit</Button>
            </form>
        </Form>
    )
}

export default CreateTaskForm