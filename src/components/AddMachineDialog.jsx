import './AddTaskDialog.css'

import PropTypes, { number } from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { useAddMachine } from '../hooks/data/use-add-machine'
import Button from './Button'
import Input from './Input'
import ServiceFrequencySelect from './ServiceFrequencySelect'
import PlantSelect from './PlantSelect'
import StatusSelect from './StatusSelect'

const AddMachineDialog = ({ isOpen, handleClose, area }) => {
  const { mutate } = useAddMachine()
  const {
    register,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
    title: '',
    plant: 'mobile',
    manufacturer: '',
    year: '',
    serial: '',
    serviceFrequency: '1month',
    hours: '',
    mileage: '',
    status: 'active'
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const machine = {
        id: v4(),
        area: area,
        title: data?.title?.trim(),
        plant: data?.plant,
        manufacturer: data?.manufacturer?.trim(),
        year: data?.year?.trim(),
        serial: data?.serial?.trim(),
        serviceFrequency: data?.serviceFrequency,
        hours: data?.hours?.trim(),
        mileage: data?.mileage?.trim(),
        status: data?.status,
    }

    mutate(machine, {
      onSuccess: () => {
        handleClose()
        reset({
            title: '',
            plant: 'mobile',
            manufacturer: '',
            year: '',
            serial: '',
            serviceFrequency: '1month',
            hours: '',
            mileage: '',
            status: 'active'
        })
      },
      onError: (error) => {
        toast.error('Something went wrong while adding task. Please try again!')
        console.log('Error adding machine:', error)
      }
    })
  }

  const handleCancelClick = () => {
    reset({
        title: '',
        plant: 'mobile',
        manufacturer: '',
        year: '',
        serial: '',
        serviceFrequency: '1month',
        hours: '',
        mileage: '',
        status: 'active'
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
                Add New Machine for {area}
              </h2>
              <p className="my-1 text-sm text-brand-text-gray">
                Insert info below
              </p>
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Name"
                  placeholder="Name"
                  // value={title}
                  // onChange={(event) => {
                  //   setTitle(event.target.value)
                  // }}
                  errorMessage={errors?.title?.message}
                  {...register('title', {
                    required: 'Name is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Name cannot be empty'
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
                  label="Years"
                  placeholder="Years"
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
                  id="serial"
                  label="Serial Number"
                  placeholder="Serial Number"
                  errorMessage={errors?.serial?.message}
                  // ref={descriptionRef}
                  disabled={isLoading}
                  {...register('serial', {
                    required: 'Serial Number is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Serial Number cannot be empty'
                      }
                      return true
                    },
                  })}
                />

                <ServiceFrequencySelect
                  disabled={isLoading}
                  {...register('serviceFrequency', { required: true })}
                />

                <Input
                  id="hours"
                  label="Hours"
                  placeholder="Hours"
                  errorMessage={errors?.hours?.message}
                  // ref={descriptionRef}
                  disabled={isLoading}
                  {...register('hours', {
                    required: 'Hours is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Hours cannot be empty'
                      }
                      return true
                    },
                  })}
                />

                  <Input
                  id="mileage"
                  label="Mileage"
                  placeholder="Mileage"
                  errorMessage={errors?.mileage?.message}
                  // ref={descriptionRef}
                  disabled={isLoading}
                  {...register('mileage', {
                    required: 'Mileage is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Mileage cannot be empty'
                      }
                      return true
                    },
                  })}
                />

                <StatusSelect
                  disabled={isLoading}
                  {...register('status', { required: true })}
                />

                <div className="flex gap-3">
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
