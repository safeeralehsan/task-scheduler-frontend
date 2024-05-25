import TaskCard from './components/task-card'
import CreateTaskForm from './components/create-task-form'
import { useAppSelector } from './hooks/useAppSelector'

function App() {
  const { taskList } = useAppSelector(state => state.tasks)

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
                <TaskCard key={task.title} task={task} />
              )
            })
          }
        </div>
      </div>
      
    </>
  )
}

export default App
