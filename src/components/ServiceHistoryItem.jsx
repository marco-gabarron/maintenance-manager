import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import Button from './Button'
import { useUpdateHistory } from '../hooks/data/use-update-history'
import { useDeleteHistory } from '../hooks/data/use-delete-history'

const ServiceHistoryItem = ({ service }) => {
  //const { mutate, isPending } = useDeleteHistory(service.id)

  //const { mutate: updateTask } = useUpdateHistory(service.id)

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
      className={`flex items-center gap-3 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue`}
    >
      <div className="flex items-center justify-center divide-x-2 w-full justify-between">
        <div
          className={`flex h-7 items-center justify-center p-2`}
        >
          11/09/2025
        </div>
        <div
          className={`flex h-7 items-center justify-center p-2`}
        >
          Major / Minor
        </div>
        <div
          className={`flex h-7 items-center justify-center p-2`}
        >
          Service Details
        </div>
        <div
          className={`flex h-7 items-center justify-center p-2`}
        >
          {service?.title}
        </div>
        <div
          className={`flex h-7 items-center justify-center p-2`}
        >
           Hours
        </div>

        <div
          className={`flex h-7 items-center justify-center p-2`}
        >
           Mileage
        </div>

        <div
          className={`flex h-7 items-center justify-center p-2`}
        >
           
        Completed By
        </div>
      
        
      </div>

      {/* <Button color="ghost" onClick={handleDeleteClick}>
            <TrashIcon className="text-brand-text-gray" />
        </Button> */}

        <Link to={`/maintenance/10`}>
          <DetailsIcon />
        </Link>
    </div>
  )
}

// ServiceHistoryItem.propTypes = {
//   service: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     type: PropTypes.oneOf(['breakdown', 'service', 'pm']).isRequired,
//     hours: PropTypes.string,
//     mileage: PropTypes.string,
//     completedBy: PropTypes.string,
//   }).isRequired,
// }

export default ServiceHistoryItem
