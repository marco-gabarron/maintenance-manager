import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ArrowLeftIcon, ChevronRightIcon, AddIcon } from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'

import { useDeleteHistory } from '../hooks/data/use-delete-history'
import { useUpdateMachine } from '../hooks/data/use-update-machine'
import { useUpdateHistory } from '../hooks/data/use-update-history'
import { useGetHistory } from '../hooks/data/use-get-history'
import { useGetMachine } from '../hooks/data/use-get-machine'

import TypeSelect from '../components/TypeSelect'
import ServiceSelect from '../components/ServiceSelect'

const HistoryDetailsPage = ({}) => {
  const { historyId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    reset,
  } = useForm()
  const { mutate: updateHistory, isPending: updateHistoryIsLoading } =
    useUpdateHistory(historyId)
  const { mutate: deleteHistory, isPending: deleteHistoryIsLoading } =
    useDeleteHistory(historyId)
  const { data: history } = useGetHistory(historyId, reset)
  const { data: machine } = useGetMachine(history?.machineId, reset)

  //const { mutate: updateTask, isPending: updateTaskIsLoading } = useUpdateTask(machineId)

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateHistory(data, {
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
      <div className="w-full space-y-4 px-8 py-10">
        {/* Top Bar */}
        <div className="flex w-full justify-between">
          <div className='flex gap-2 items-center'>
            <button
              onClick={handleBackClick}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            <h1 className="text-xl font-semibold">
              {machine?.title} 
              </h1>

          </div>
        </div>

                    {/* Left Side */}
            <div className="flex items-center gap-1 text-xs">
              <Link to={`/maintenance/${machine?.area}`} className="cursor-pointer text-brand-text-gray">
                {machine?.area}  
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <Link to={`/machine/${machine?.id}`} className="cursor-pointer text-brand-text-gray">
                {machine?.title}
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {history?.id}
              </span>
            </div>

  <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
                        <Input
                           id="date"
                           label="Service Date"
                           placeholder="Enter Service Date"
                           // value={title}
                           // onChange={(event) => {
                           //   setTitle(event.target.value)
                           // }}
                           errorMessage={errors?.date?.message}
                           {...register('date', {
                             required: 'Date is required',
                             validate: (value) => {
                               if (!value.trim()) {
                                 return 'Date cannot be empty'
                               }
                               return true
                             },
                           })}
                           disabled={isLoading}
                         />
         
                         <ServiceSelect
                           disabled={isLoading}
                           {...register('service', { required: true })}
                         />
         
                         <Input
                           id="description"
                           label="Service Details"
                           placeholder="Service Details"
                           errorMessage={errors?.description?.message}
                           // ref={descriptionRef}
                           disabled={isLoading}
                           {...register('description', {
                             required: 'Service Description is required',
                             validate: (value) => {
                               if (!value.trim()) {
                                 return 'Service Description cannot be empty'
                               }
                               return true
                             },
                           })}
                         />
         
                         <TypeSelect
                           disabled={isLoading}
                           {...register('type', { required: true })}
                         />
         
                         <Input
                           id="hoursService"
                           label="Hours"
                           placeholder="Current Hours"
                           errorMessage={errors?.hours?.message}
                           // ref={descriptionRef}
                           disabled={isLoading}
                           {...register('hoursService', {
                             required: 'Amount of Hours is required',
                             validate: (value) => {
                               if (!value.trim()) {
                                 return 'Hours cannot be empty'
                               }
                               return true
                             },
                           })}
                         />
         
                         <Input
                           id="mileageService"
                           label="Mileage"
                           placeholder="Current Mileage"
                           errorMessage={errors?.mileage?.message}
                           // ref={descriptionRef}
                           disabled={isLoading}
                           {...register('mileageService', {
                             required: 'Mileage is required',
                             validate: (value) => {
                               if (!value.trim()) {
                                 return 'Mileage cannot be empty'
                               }
                               return true
                             },
                           })}
                         />
         
                         <Input
                           id="completedBy"
                           label="Completed By"
                           placeholder="Completed By"
                           errorMessage={errors?.completedBy?.message}
                           // ref={descriptionRef}
                           disabled={isLoading}
                           {...register('completedBy', {
                             required: 'Completed By is required',
                             validate: (value) => {
                               if (!value.trim()) {
                                 return 'Completed By cannot be empty'
                               }
                               return true
                             },
                           })}
                         />
         
                    </div>

          <div className="flex w-full justify-end mt-2">
            <Button
              size="large"
              color="primary"
              // onClick={handleSaveClick}
              //disabled={updateTaskIsLoading || deleteTaskIsLoading}
              type="submit"
            >
             Save
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default HistoryDetailsPage
