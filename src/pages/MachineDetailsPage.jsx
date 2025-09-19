import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useState } from 'react'

import { ArrowLeftIcon, ChevronRightIcon, AddIcon } from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'

import AreaSelect from '../components/AreaSelect'
import ServiceFrequencySelect from '../components/ServiceFrequencySelect'
import StatusSelect from '../components/StatusSelect'
import ServiceHistoryItem from '../components/ServiceHistoryItem'
import ServiceHistorySeparator from '../components/ServiceHistorySeparator'

import { useGetMachine } from '../hooks/data/use-get-machine'
import { useDeleteHistory } from '../hooks/data/use-delete-history'
import { useUpdateHistory } from '../hooks/data/use-update-history'
import { useGetHistories } from '../hooks/data/use-get-histories'

import AddHistoryDialog from '../components/AddHistoryDialog'

const MachineDetailsPage = () => {
  const { machineId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const { mutate: updateHistory, isPending: updateHistoryIsLoading } =
    useUpdateHistory(machineId)
  const { mutate: deleteHistory, isPending: deleteHistoryIsLoading } =
    useDeleteHistory(machineId)
  const { data: machine } = useGetMachine(machineId, reset)
  const {data: histories } = useGetHistories(machineId)

  //const { mutate: updateTask, isPending: updateTaskIsLoading } = useUpdateTask(machineId)
 const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

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

            <h1 className="text-xl font-semibold">{machine?.title}</h1>

          </div>
          {/* Right Side */}
          <Button
            className="h-fit self-end"
            color="primary"
            onClick={() => setAddTaskDialogIsOpen(true)}
          >
            <AddIcon />
            Add Service Entry
          </Button>

                  <AddHistoryDialog
                    isOpen={addTaskDialogIsOpen}
                    // If its something more complicated its worth to use like this and create a function up there
                    handleClose={() => setAddTaskDialogIsOpen(false)}
                    machineId={machine?.id}
                    machineTitle={machine?.title}
                  />
        </div>

                    {/* Left Side */}
            <div className="flex items-center gap-1 text-xs">
              <Link to={`/maintenance/${machine?.area}`} className="cursor-pointer text-brand-text-gray">
                {machine?.area}  
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {machine?.title}
              </span>
            </div>

  <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="grid grid-cols-5 gap-3 rounded-xl bg-brand-white p-4 text-center">
            <div className='col-span-2'>
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


{/* Component to work as a selector */}
            <AreaSelect
                // value={task?.time}
                {...register('area', {
                  required: 'Please fill Area',
                })}
              />
              
            <div>
              <Input
                id="manufacturer"
                label="Manufacturer"
                // defaultValue={task?.description}
                errorMessage={errors?.manufacturer?.message}
                {...register('manufacturer', {
                  required: 'Please fill Description',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Manufacturer cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <div>
              <Input
                id="year"
                label="Year"
                // defaultValue={task?.description}
                errorMessage={errors?.year?.message}
                {...register('year', {
                  required: 'Please fill Year',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Year cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <div>
              <Input
                id="serial"
                label="Serial"
                // defaultValue={task?.description}
                errorMessage={errors?.serial?.message}
                {...register('serial', {
                  required: 'Please fill Serial',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Serial cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <ServiceFrequencySelect
                // value={task?.time}
                {...register('serviceFrequency', {
                  required: 'Please fill Area',
                })}
              />

            <div>
              <Input
                id="hours"
                label="Hours"
                // defaultValue={task?.description}
                errorMessage={errors?.hours?.message}
                {...register('hours', {
                  required: 'Please fill Hours',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Hours cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <div>
              <Input
                id="mileage"
                label="Mileage"
                // defaultValue={task?.description}
                errorMessage={errors?.mileage?.message}
                {...register('mileage', {
                  required: 'Please fill Mileage',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Mileage cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <StatusSelect
                // value={task?.time}
                {...register('status', {
                  required: 'Please fill Area',
                })}
              />

          </div>

{/* Second Part of Details - History */}
<div className="w-full space-y-6 px-4 py-4">
    <div className="grid grid-cols-1 gap-6 border-black border border-solid rounded-[10px]">
          <div className="space-y-6 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="text-xl font-semibold">Service History</h3>
              <span className="text-sm text-brand-dark-gray">
                {machine?.title}
              </span>
            </div>
            <div className="space-y-2">
              <ServiceHistorySeparator />
              {histories?.map((history) => (
                <ServiceHistoryItem key={history.id} history={history} />
              ))}
              {/* <ServiceHistoryItem key={history?.id} machine={m1} />
              <ServiceHistoryItem key={history?.id} machine={m2} />
              <ServiceHistoryItem key={history?.id} machine={m3} /> */}

            </div>
          </div>
      </div>
</div>

          <div className="flex w-full justify-end gap-3">
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

export default MachineDetailsPage
