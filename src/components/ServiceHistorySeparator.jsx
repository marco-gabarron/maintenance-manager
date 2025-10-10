import { Link } from 'react-router-dom'

import { DetailsIcon } from '../assets/icons'

const ServiceHistorySeparator = () => {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-solid border-black bg-brand-dark-blue bg-opacity-10 px-4 py-3 text-sm transition`}
    >
      <div className="grid w-full grid-cols-9 items-center justify-center divide-x-2">
        <div className={`flex items-center justify-center p-2`}>Date</div>

        <div className={`flex items-center justify-center p-2`}>Type</div>
        <div className={`flex items-center justify-center p-2`}>
          Major / Minor
        </div>

        <div className={`col-span-3 flex items-center justify-center p-2`}>
          Service Details
        </div>

        <div className={`flex items-center justify-center p-2`}>Hours</div>

        <div className={`flex items-center justify-center p-2`}>Mileage</div>

        <div className={`flex items-center justify-center p-2`}>
          Completed By
        </div>
      </div>
      <Link to={`/maintenance`}>
        <DetailsIcon />
      </Link>
    </div>
  )
}

export default ServiceHistorySeparator
