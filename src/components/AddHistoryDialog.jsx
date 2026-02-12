import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'

import { LoaderIcon } from '../assets/icons'
import { useAddHistory } from '../hooks/data/use-add-history'
import Button from './Button'
import DescriptionTextArea from './DescriptionTextArea'
import Input from './Input'
import InputLabel from './InputLabel'
import ServiceSelect from './ServiceSelect'
import TypeSelect from './TypeSelect'

const AddHistoryDialog = ({ isOpen, handleClose, machineId, machineTitle }) => {
  const { mutate } = useAddHistory()
  const {
    register,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      date: '',
      service_level: 'minor',
      description: '',
      service_type: 'pm',
      hours_service: '',
      mileage_service: '',
      completed_by: '',
    },
  })

  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    // Create FormData for multipart upload
    const formData = new FormData()

    // Add machine fields
    formData.append('machine_id', machineId)
    formData.append('date', data?.date)
    formData.append('service_level', data?.service_level)
    formData.append('description', data?.description?.trim())
    formData.append('service_type', data?.service_type)
    formData.append('hours_service', parseInt(data?.hours_service?.trim()))
    formData.append('mileage_service', parseInt(data?.mileage_service?.trim()))
    formData.append('completed_by', data?.completed_by?.trim())

    //   machine_id: machineId,
    //   date: data?.date,
    //   service_level: data?.service_level,
    //   description: data?.description?.trim(),
    //   service_type: data?.service_type,
    //   hours_service: parseInt(data?.hours_service?.trim()),
    //   mileage_service: parseInt(data?.mileage_service?.trim()),
    //   completed_by: data?.completed_by?.trim(),

    // Add file if selected
    if (selectedFile) {
      formData.append('file', selectedFile, selectedFile.name)
    }

    // const history = {
    //   machine_id: machineId,
    //   date: data?.date,
    //   service_level: data?.service_level,
    //   description: data?.description?.trim(),
    //   service_type: data?.service_type,
    //   hours_service: parseInt(data?.hours_service?.trim()),
    //   mileage_service: parseInt(data?.mileage_service?.trim()),
    //   completed_by: data?.completed_by?.trim(),
    // }

    mutate(formData, {
      onSuccess: () => {
        handleClose()
        reset({
          date: '',
          service_level: 'minor',
          description: '',
          service_type: 'pm',
          hours_service: '',
          mileage_service: '',
          completed_by: '',
        })
        setSelectedFile(null)
      },
      onError: () => {
        toast.error('Something went wrong while adding task. Please try again!')
      },
    })
  }

  const handleCancelClick = () => {
    reset({
      date: '',
      service_level: 'minor',
      description: '',
      service_type: 'pm',
      hours_service: '',
      mileage_service: '',
      completed_by: '',
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Add New Service history for {machineTitle}
              </h2>
              <p className="my-1 text-sm text-brand-text-gray">
                Insert info below
              </p>
              <form onSubmit={handleSubmit(handleSaveClick)}>
                <div className="space-3 grid grid-cols-2 flex-col gap-3 pt-5">
                  <Input
                    id="date"
                    label="Service Date"
                    placeholder="Enter Service Date"
                    // value={title}
                    // onChange={(event) => {
                    //   setTitle(event.target.value)
                    // }}
                    type="date"
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
                    {...register('service_level', { required: true })}
                  />

                  <DescriptionTextArea
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
                    {...register('hours_service', { required: false })}
                  />

                  <Input
                    id="mileage_service"
                    label="Mileage"
                    placeholder="Current Mileage"
                    errorMessage={errors?.mileage_service?.message}
                    // ref={descriptionRef}
                    disabled={isLoading}
                    {...register('mileage_service', { required: false })}
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
                  <div className="grid items-center gap-3">
                    <InputLabel htmlFor="uploadFile">
                      Service Document (optional)
                    </InputLabel>
                    <input
                      id="uploadFile"
                      type="file"
                      onChange={handleFileChange}
                      disabled={isLoading}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading && <LoaderIcon className="animate-spin" />}
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddHistoryDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default AddHistoryDialog
