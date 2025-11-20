import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { AddIcon, ArrowLeftIcon, ChevronRightIcon } from '../assets/icons'
import AddHistoryDialog from '../components/AddHistoryDialog'
import AreaSelect from '../components/AreaSelect'
import Button from '../components/Button'
import Input from '../components/Input'
import InputLabel from '../components/InputLabel'
import ServiceFrequencySelect from '../components/ServiceFrequencySelect'
import ServiceHistoryItem from '../components/ServiceHistoryItem'
import ServiceHistorySeparator from '../components/ServiceHistorySeparator'
import Sidebar from '../components/Sidebar'
import StatusSelect from '../components/StatusSelect'
import { useGetHistories } from '../hooks/data/use-get-histories'
import { useGetMachine } from '../hooks/data/use-get-machine'
import { useUpdateMachine } from '../hooks/data/use-update-machine'

const MachineDetailsPage = () => {
  const { machineId } = useParams()
  let search = window.location.search
  let params = new URLSearchParams(search)
  const area = params.get('area')

  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const { mutate: updateMachine } = useUpdateMachine(machineId)
  // const { mutate: deleteHistory, isPending: deleteHistoryIsLoading } =
  //   useDeleteHistory(machineId)
  const { data: machine } = useGetMachine(machineId, reset)
  const { data: histories } = useGetHistories(machineId)

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateMachine(data, {
      onSuccess: () => {
        toast.success('Machine Details updated successfully')
      },
      onError: (error) => {
        console.log(error)
        toast.error('Something went wrong while updating, Please try again!')
      },
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-4 px-8 py-10">
        {/* Top Bar */}
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBackClick}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            <h1 className="text-xl font-semibold">{machine?.model}</h1>
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
            machineTitle={machine?.model}
          />
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-1 text-xs">
          <Link
            to={`/maintenance/machines/${machine?.area_id}`}
            className="cursor-pointer text-brand-text-gray"
          >
            {area}
          </Link>
          <ChevronRightIcon className="text-brand-text-gray" />
          <span className="font-semibold text-brand-primary">
            {machine?.model}
          </span>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="grid grid-cols-5 gap-3 rounded-xl bg-brand-white p-4 text-center">
            <div>
              <Input
                id="machine_type"
                label="Machine Type"
                errorMessage={errors?.machine_type?.message}
                {...register('machine_type', {
                  required: 'Please fill Machine Type',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Machine Type cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <div>
              <Input
                id="model"
                label="Model"
                // defaultValue={task?.title}
                errorMessage={errors?.model?.message}
                {...register('model', {
                  required: 'Please fill Model',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Model cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            {/* Component to work as a selector */}
            <AreaSelect
              // value={task?.time}
              {...register('area_id', {
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
                  required: true,
                })}
              />
            </div>

            <div>
              <Input
                id="seria_number"
                label="Serial Number"
                // defaultValue={task?.description}
                errorMessage={errors?.serial_number?.message}
                {...register('serial_number', {
                  required: 'Please fill Serial Number',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Serial Number cannot be empty'
                    }
                    return true
                  },
                })}
              />
            </div>

            <ServiceFrequencySelect
              // value={task?.time}
              {...register('service_frequency', {
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
                  required: false,
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
                  required: false,
                })}
              />
            </div>

            <div className="grid items-center gap-2">
              <InputLabel htmlFor="brake_test">Brake Test</InputLabel>
              <input
                id="brake_test"
                type="checkbox"
                {...register('brake_test', { required: false })}
              />
            </div>
            <div>
              <StatusSelect
                {...register('status', {
                  required: false,
                })}
              />
            </div>

            {/*<div className="flex flex-col gap-2">
              <InputLabel htmlFor="service_agreement">
                Service Agreement
              </InputLabel>
              <a
                href="http://localhost:8080/api/downloads"
                target="_blank"
                rel="noreferrer"
              >
                Precast Sizes
               </a>
            </div> */}
          </div>

          {/* Second Part of Details - History */}
          <div className="w-full space-y-6 px-4 py-4">
            <div className="grid grid-cols-1 gap-6 rounded-[10px] border border-solid border-black">
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
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button size="large" color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MachineDetailsPage
