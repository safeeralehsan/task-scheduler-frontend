import TaskCard from './components/task-card'
import CreateTaskForm from './components/create-task-form'
import { useAppSelector } from './hooks/useAppSelector'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks/useAppDispatch'
import { completeTask, fetchTasks } from './store/tasks/tasksSlice'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { firestoreDB } from './config/firestore'
import { TaskStatus } from './lib/constants'
import { Task } from './lib/types'
import { toast } from './components/ui/use-toast'

function App() {
  const { taskList } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks('user'))
    const q = query(collection(firestoreDB, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const updatedTask = change.doc.data() as Task
          if (updatedTask.status === TaskStatus.COMPLETE) {
            dispatch(completeTask(updatedTask.id))
            toast({
              title: `Task: ${updatedTask.title}, has been completed!`,
              variant: "default"
            })
          }
        }
      });
    });
    return (() => {
      unsubscribe()
    })
  }, [])

  return (
    <>
      <div className='max-w-4xl mx-auto grid grid-cols-2 h-dvh'>
        <div className='max-w-sm my-auto'>
          <div className='w-full bg-slate-100 p-10 mt-4 rounded'>
            <CreateTaskForm />
          </div>
        </div>
        <div className='mt-2'>
          {
            taskList.map(task => {
              return (
                <TaskCard key={task.id} task={task} />
              )
            })
          }
        </div>
      </div>
      
    </>
  )
}

export default App
