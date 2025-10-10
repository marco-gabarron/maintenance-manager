import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { DetailsIcon } from '../assets/icons'
// import { useDeleteHistory } from '../hooks/data/use-delete-history'
// import { useUpdateMachine } from '../hooks/data/use-update-machine'
// import Button from './Button'

const ServiceHistoryItem = ({ history }) => {
  const date = new Date(history.date)
  history.date = date.toLocaleDateString('en-GB')

  return (
    <div
      className={`flex items-center gap-3 rounded-lg bg-brand-dark-blue bg-opacity-5 px-4 py-3 text-sm text-brand-dark-blue transition hover:bg-gray-50`}
    >
      <div className="grid w-full grid-cols-9 items-center justify-center divide-x-2">
        <div className={`flex items-center justify-center p-2`}>
          {history.date}
        </div>

        <div className={`flex items-center justify-center p-2`}>
          {history.service_type === 'breakdown' && 'Breakdown'}
          {history.service_type === 'pm' && 'Preventive Maintenance'}
          {history.service_type === 'service' && 'Service'}
        </div>

        <div className={`flex items-center justify-center p-2`}>
          {history.service_level === 'minor' && 'Minor'}
          {history.service_level === 'major' && 'Major'}
        </div>

        <div className={`col-span-3 flex items-center justify-center p-2`}>
          {history.description}
        </div>

        <div className={`flex items-center justify-center p-2`}>
          {history.hours_service}
        </div>

        <div className={`flex items-center justify-center p-2`}>
          {history.mileage_service}
        </div>

        <div className={`flex items-center justify-center p-2`}>
          {history.completed_by}
        </div>
      </div>

      {/* <Button color="ghost" onClick={handleDeleteClick}>
            <TrashIcon className="text-brand-text-gray" />
        </Button> */}

      <Link to={`/maintenance/history/${history?.id}`}>
        <DetailsIcon />
      </Link>
    </div>
  )
}

ServiceHistoryItem.propTypes = {
  history: PropTypes.shape({
    description: PropTypes.string,
    service_type: PropTypes.oneOf(['breakdown', 'service', 'pm']).isRequired,
    hours_service: PropTypes.number,
    mileage_service: PropTypes.number,
    completed_by: PropTypes.string,
  }).isRequired,
}

export default ServiceHistoryItem
