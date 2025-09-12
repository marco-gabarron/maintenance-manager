import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons'
import { LoaderIcon } from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'
import { useDeleteTask } from '../hooks/data/use-delete-tasks'
import { useGetTask } from '../hooks/data/use-get-task'
import { useUpdateTask } from '../hooks/data/use-update-task'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  // const [saveIsLoading, setSaveIsLoading] = useState(false)
  // const [errors, setErrors] = useState([])
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId)
  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId)
  const { data: task } = useGetTask(taskId, reset)

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => toast.success('Task updated successfully'),
      onError: () => toast.error('Something went wrong when updating.'),
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Task deleted successfully')
        navigate(-1)
      },
      onError: () => toast.error('Error when trying to delete task!'),
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* Top Bar */}
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            {/* Left Side */}
            <div className="flex items-center gap-1 text-xs">
              <Link to="/" className="cursor-pointer text-brand-text-gray">
                My Tasks
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* Right Side */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Delete Task
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Title"
                // defaultValue={task?.title}
                errorMessage={errors?.title?.message}
                {...register('title', {
                  required: 'Please fill Title',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Title cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <div>
              <TimeSelect
                // value={task?.time}
                {...register('time', {
                  required: 'Please fill Time',
                })}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Description"
                // defaultValue={task?.description}
                errorMessage={errors?.description?.message}
                {...register('description', {
                  required: 'Please fill Description',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Description cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              // onClick={handleSaveClick}
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              type="submit"
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
