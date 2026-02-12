import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'

import { LoaderIcon } from '../assets/icons'
import { useAddMachine } from '../hooks/data/use-add-machine'
// import { api } from '../lib/axios'
import Button from './Button'
import Input from './Input'
import InputLabel from './InputLabel'
import PlantSelect from './PlantSelect'
import ServiceFrequencySelect from './ServiceFrequencySelect'
import StatusSelect from './StatusSelect'

const AddMachineDialog = ({ isOpen, handleClose, area, areaId }) => {
  const { mutate } = useAddMachine()
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const {
    register,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      machine_type: '',
      model: '',
      plant: 'mobile',
      manufacturer: '',
      year: '',
      serial_number: '',
      brake_test: false,
      service_frequency: '1month',
      hours: '',
      mileage: '',
      status: 'active',
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    // Create FormData for multipart upload
    const formData = new FormData()

    // Add machine fields
    formData.append('area_id', areaId)
    formData.append('machine_type', data?.machine_type?.trim())
    formData.append('model', data?.model?.trim())
    formData.append('plant', data?.plant)
    formData.append('manufacturer', data?.manufacturer?.trim())
    formData.append('year', parseInt(data?.year))
    formData.append('serial_number', data?.serial_number?.trim())
    formData.append('brake_test', data?.brake_test)
    formData.append('service_frequency', data?.service_frequency)
    formData.append('hours', parseInt(data?.hours))
    formData.append('mileage', parseInt(data?.mileage))
    formData.append('status', data?.status)

    // Add file if selected
    if (selectedFile) {
      formData.append('file', selectedFile, selectedFile.name)
    }

    mutate(formData, {
      onSuccess: () => {
        handleClose()
        reset({
          machine_type: '',
          model: '',
          plant: 'mobile',
          manufacturer: '',
          year: '',
          serial_number: '',
          brake_test: false,
          service_frequency: '1month',
          hours: '',
          mileage: '',
          status: 'active',
        })
        setSelectedFile(null)
      },
      onError: (error) => {
        toast.error(
          'Something went wrong while adding machine. Please try again!'
        )
        console.log('Error adding machine:', error)
      },
    })

    //after upload file implementation
    // build plain object for machine fields (no file)
  }

  const handleCancelClick = () => {
    reset({
      machine_type: '',
      model: '',
      plant: 'mobile',
      manufacturer: '',
      year: '',
      serial_number: '',
      brake_test: false,
      service_frequency: '1month',
      hours: '',
      mileage: '',
      status: 'active',
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
                Add New Machine to {area}
              </h2>
              <form onSubmit={handleSubmit(handleSaveClick)}>
                <div className="space-3 grid grid-cols-2 flex-col gap-3 pt-5">
                  <Input
                    id="machine_type"
                    label="Machine Type"
                    placeholder="Machine Type"
                    // value={title}
                    // onChange={(event) => {
                    //   setTitle(event.target.value)
                    // }}
                    errorMessage={errors?.machine_type?.message}
                    {...register('machine_type', {
                      required: 'Machine Type is required',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'Machine Type cannot be empty'
                        }
                        return true
                      },
                    })}
                    disabled={isLoading}
                  />

                  <Input
                    id="model"
                    label="Model"
                    placeholder="Model"
                    // value={title}
                    // onChange={(event) => {
                    //   setTitle(event.target.value)
                    // }}
                    errorMessage={errors?.model?.message}
                    {...register('model', {
                      required: 'Model is required',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'Model cannot be empty'
                        }
                        return true
                      },
                    })}
                    disabled={isLoading}
                  />

                  <PlantSelect
                    disabled={isLoading}
                    {...register('plant', { required: true })}
                  />

                  <Input
                    id="manufacturer"
                    label="Manufacturer"
                    placeholder="Manufacturer"
                    errorMessage={errors?.manufacturer?.message}
                    // ref={descriptionRef}
                    disabled={isLoading}
                    {...register('manufacturer', {
                      required: 'Manufacturer is required',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'Manufacturer cannot be empty'
                        }
                        return true
                      },
                    })}
                  />

                  <Input
                    id="year"
                    label="Year"
                    placeholder="Year"
                    errorMessage={errors?.year?.message}
                    // ref={descriptionRef}
                    disabled={isLoading}
                    {...register('year', {
                      required: 'Years is required',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'Years cannot be empty'
                        }
                        return true
                      },
                    })}
                  />

                  <Input
                    id="serial_number"
                    label="Serial Number"
                    placeholder="Serial Number"
                    errorMessage={errors?.serial_number?.message}
                    // ref={descriptionRef}
                    disabled={isLoading}
                    {...register('serial_number', { required: false })}
                  />

                  <ServiceFrequencySelect
                    disabled={isLoading}
                    {...register('service_frequency', { required: false })}
                  />

                  <Input
                    id="hours"
                    label="Hours"
                    placeholder="Hours"
                    errorMessage={errors?.hours?.message}
                    // ref={descriptionRef}
                    disabled={isLoading}
                    {...register('hours', { required: false })}
                  />

                  <Input
                    id="mileage"
                    label="Mileage"
                    placeholder="Mileage"
                    errorMessage={errors?.mileage?.message}
                    // ref={descriptionRef}
                    disabled={isLoading}
                    {...register('mileage', { required: false })}
                  />

                  <StatusSelect
                    disabled={isLoading}
                    {...register('status', { required: true })}
                  />

                  <div className="grid items-center gap-3">
                    <InputLabel htmlFor="brake_test">Brake Test</InputLabel>
                    <input
                      id="brake_test"
                      type="checkbox"
                      {...register('brake_test', { required: false })}
                    />
                  </div>
                  <div className="grid items-center gap-3">
                    <InputLabel htmlFor="uploadFile">
                      Service Agreement File
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

AddMachineDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default AddMachineDialog
