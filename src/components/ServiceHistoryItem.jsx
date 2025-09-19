import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import Button from './Button'
import { useUpdateMachine } from '../hooks/data/use-update-machine'
import { useDeleteHistory } from '../hooks/data/use-delete-history'

const ServiceHistoryItem = ({ history }) => {
  // const { mutate, isPending } = useDeleteHistory(machine.id)
  // const { mutate: updateHistory } = useUpdateHistory(machine.id)

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success('Task has been deleted successfully!')
      },
      onError: () => {
        toast.error('Task Deletion failed!')
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary'
    }
    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process'
    }
    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue'
    }
  }

  const getNewStatus = () => {
    if (task.status === 'not_started') {
      return 'in_progress'
    }
    if (task.status === 'in_progress') {
      return 'done'
    }
    return 'not_started'
  }

  const handleCheckBoxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => toast.success('Task status updated successfully!'),
        onError: () => 'Error while updating task status, please try again!',
      }
    )
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue hover:bg-gray-50`}
    >
      <div className="grid grid-cols-9 items-center justify-center divide-x-2 w-full">
        <div
          className={`flex items-center justify-center p-2`}
        >
          {history.date}
        </div>

        <div
          className={`flex items-center justify-center p-2`}
        >
          {history.type === 'breakdown' && 'Breakdown'}
          {history.type === 'pm' && 'Preventive Maintenance'}
          {history.type === 'service' && 'Service'}
        </div>

        <div
          className={`flex items-center justify-center p-2`}
        >
          {history.service === 'minor' && 'Minor'}
          {history.service === 'major' && 'Major'}
        </div>

        <div
          className={`flex items-center justify-center p-2 col-span-3`}
        >
          {history.description}
        </div>

        <div
          className={`flex items-center justify-center p-2`}
        >
           {history.hoursService}
        </div>

        <div
          className={`flex items-center justify-center p-2`}
        >
           {history.mileageService}
        </div> 

        <div
          className={`flex items-center justify-center p-2`}
        >
           
        {history.completedBy}
        </div>
      
        
      </div>

      {/* <Button color="ghost" onClick={handleDeleteClick}>
            <TrashIcon className="text-brand-text-gray" />
        </Button> */}

        <Link to={`/history/${history?.id}`}>
          <DetailsIcon />
        </Link>
    </div>
  )
}

ServiceHistoryItem.propTypes = {
  history: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    // category: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.oneOf(['breakdown', 'service', 'pm']).isRequired,
    hours: PropTypes.string,
    mileage: PropTypes.string,
    completedBy: PropTypes.string,
  }).isRequired,
}

export default ServiceHistoryItem
