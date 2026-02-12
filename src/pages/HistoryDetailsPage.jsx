import { format, parseISO } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import InputLabel from '@/components/InputLabel'

import { ArrowLeftIcon, ChevronRightIcon } from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import ServiceSelect from '../components/ServiceSelect'
import Sidebar from '../components/Sidebar'
import TypeSelect from '../components/TypeSelect'
import { useGetFile } from '../hooks/data/use-get-file'
import { useGetHistory } from '../hooks/data/use-get-history'
// import { useGetMachine } from '../hooks/data/use-get-machine'
import { useUpdateHistory } from '../hooks/data/use-update-history'

const HistoryDetailsPage = () => {
  const { historyId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    reset,
  } = useForm()

  const { mutate: updateHistory } = useUpdateHistory(historyId)
  const { data: history } = useGetHistory(historyId, reset)
  const { data: file } = useGetFile(
    history?.file_service_report,
    'service-report'
  )

  // const { data: machine } = useGetMachine(history?.machine_id, reset)

  const [date, setDate] = React.useState('')

  React.useEffect(() => {
    if (!history) return

    const dateObj =
      typeof history.date === 'string'
        ? parseISO(history.date)
        : history.date
          ? new Date(history.date)
          : null

    setDate(dateObj ? format(dateObj, 'yyyy-MM-dd') : '')
  }, [history])

  // const formattedDate = history?.date
  //   ? format(history?.date, 'yyyy-MM-dd') // display as dd/MM/yyyy
  //   : ''

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    data.date = date
    updateHistory(data, {
      onSuccess: () => toast.success('Service History updated successfully'),
      onError: () =>
        toast.error('Something went wrong while updating, Please try again!'),
    })
  }

  const handleOpenServiceAgreement = (e) => {
    e.preventDefault()
    if (file) {
      // Create a blob URL and open in new tab
      const blobUrl = URL.createObjectURL(file)
      window.open(blobUrl, '_blank')

      // Optional: cleanup the URL after a delay
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
    } else {
      toast.error('No Service Report file uploaded for this service.')
    }

    // if (history?.file_service_report) {
    //   const fileUrl = `http://localhost:8080/api/downloads/${history.file_service_report}?originalSource=service-report`
    //   window.open(fileUrl, '_blank')
    // } else {
    //   toast.error('No Service Report file uploaded for this service.')
    // }
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

            <h1 className="text-xl font-semibold">
              {/* {machine?.model} */}
              Machine
            </h1>
          </div>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-1 text-xs">
          <Link
            to={`/maintenance/areas`}
            className="cursor-pointer text-brand-text-gray"
          >
            Area
          </Link>
          <ChevronRightIcon className="text-brand-text-gray" />
          <Link
            to={`/maintenance/machine/${history?.machine_id}`}
            className="cursor-pointer text-brand-text-gray"
          >
            Model
            {/* {machine?.model} */}
          </Link>
          <ChevronRightIcon className="text-brand-text-gray" />
          <span className="font-semibold text-brand-primary">
            {history?.ID}
          </span>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <Input
              id="date"
              label="Service Date"
              placeholder="Enter Service Date"
              type="date"
              errorMessage={errors?.date?.message}
              // {...register('date')}
              value={date}
              onChange={handleDateChange}
              disabled={isLoading}
            />

            <ServiceSelect
              disabled={isLoading}
              {...register('service_level', { required: true })}
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
              {...register('service_type', { required: true })}
            />

            <Input
              id="hours_service"
              label="Hours"
              placeholder="Current Hours"
              errorMessage={errors?.hours_service?.message}
              // ref={descriptionRef}
              disabled={isLoading}
              {...register('hours_service', {
                required: 'Amount of Hours is required',
                validate: (value) => {
                  if (!value) {
                    return 'Hours cannot be empty'
                  }
                  return true
                },
              })}
            />

            <Input
              id="mileage_service"
              label="Mileage"
              placeholder="Current Mileage"
              errorMessage={errors?.mileage_service?.message}
              // ref={descriptionRef}
              disabled={isLoading}
              {...register('mileage_service', {
                required: 'Mileage is required',
                validate: (value) => {
                  if (!value) {
                    return 'Mileage cannot be empty'
                  }
                  return true
                },
              })}
            />

            <Input
              id="completed_by"
              label="Completed By"
              placeholder="Completed By"
              errorMessage={errors?.completed_by?.message}
              // ref={descriptionRef}
              disabled={isLoading}
              {...register('completed_by', {
                required: 'Completed By is required',
                validate: (value) => {
                  if (!value.trim()) {
                    return 'Completed By cannot be empty'
                  }
                  return true
                },
              })}
            />

            <div className="flex flex-col gap-2">
              <InputLabel htmlFor="service_report">Service Report</InputLabel>
              <button
                onClick={handleOpenServiceAgreement}
                // href="http://localhost:8080/api/downloads"
                // target="_blank"
                // rel="noreferrer"
              >
                {history?.file_service_report
                  ? history.file_service_report
                  : 'No File Uploaded'}
              </button>
            </div>
          </div>

          <div className="mt-2 flex w-full justify-end">
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
