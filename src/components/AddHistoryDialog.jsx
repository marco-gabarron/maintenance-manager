import './AddTaskDialog.css'

import PropTypes, { number } from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { useAddTask } from '../hooks/data/use-add-tasks'
import Button from './Button'
import Input from './Input'
import TypeSelect from './TypeSelect'
import ServiceSelect from './ServiceSelect'

const AddHistoryDialog = ({ isOpen, handleClose, machineId, machineTitle }) => {
  const { mutate } = useAddTask()
  const {
    register,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
    machineId: machineId,
    machineTitle: machineTitle, 
    date: '',
    service: 'minor',
    description: '',
    type: 'pm',
    hours: '',
    mileage: '',
    completedBy: ''
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    }

    // if (!title.trim() || !description.trim()) {
    //   return alert('Please fill all fields')
    // }

    mutate(task, {
      onSuccess: () => {
        handleClose()
        reset({
            machineId: machineId,
            machineTitle: machineTitle, 
            date: '',
            service: 'Minor',
            description: '',
            type: 'PM',
            hours: '',
            mileage: '',
            completedBy: '',
        })
      },
      onError: () => toast.error('Something went wrong while adding task.'),
    })
  }

  const handleCancelClick = () => {
    reset({
        machineId: machineId,
        machineTitle: machineTitle, 
        date: '',
        service: 'Minor',
        description: '',
        type: 'PM',
        hours: '',
        mileage: '',
        completedBy: '',
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
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
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
                  id="hours"
                  label="Hours"
                  placeholder="Current Hours"
                  errorMessage={errors?.hours?.message}
                  // ref={descriptionRef}
                  disabled={isLoading}
                  {...register('hours', {
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
                  id="mileage"
                  label="Mileage"
                  placeholder="Current Mileage"
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
                    onClick={handleSaveClick}
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
  handleAddHistorySubmit: PropTypes.func.isRequired,
}

export default AddHistoryDialog
