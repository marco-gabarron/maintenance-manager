import { Link } from 'react-router-dom'

import { DetailsIcon } from '../assets/icons'

const ServiceHistorySeparator = () => {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition bg-brand-dark-blue bg-opacity-5 border-black border border-solid`}
    >
      <div className="grid grid-cols-9 items-center justify-center divide-x-2 w-full">
        <div
          className={`flex items-center justify-center p-2`}
        >
          Date
        </div>

        <div
          className={`flex items-center justify-center p-2`}
        >
          Type
        </div>
        <div
          className={`flex items-center justify-center p-2`}
        >
          Major / Minor
        </div>

        <div
          className={`flex items-center justify-center p-2 col-span-3`}
        >
          Service Details
        </div>


        <div
          className={`flex items-center justify-center p-2`}
        >
           Hours
        </div>

        <div
          className={`flex items-center justify-center p-2`}
        >
           Mileage
        </div>

        <div
          className={`flex items-center justify-center p-2`}
        >
           
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