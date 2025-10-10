import { Link } from 'react-router-dom'

const MachineCard = ({ id, mainText }) => {
  return (
    // <div className="flex h-[150px] flex-col items-center justify-center gap-1 rounded-[px] bg-white">
    //   <div className="flex items-center gap-2">
    //     <span className="text-brand-primary">{icon}</span>
    //     <p className="text-2xl font-semibold text-brand-dark-blue">
    //       {mainText}
    //     </p>
    //   </div>
    //   {secondaryText}
    // </div>

    // First Option
    <Link
      to={`/maintenance/machine/${id}`}
      className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {mainText}
      </h5>
    </Link>
  )
}

export default MachineCard
