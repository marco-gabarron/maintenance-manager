import { Link } from 'react-router-dom'

const MachineCard = ({ id, mainText, area }) => {
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
<Link to={`/machine/${id}`} class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mainText}</h5>
</Link>


  )
}

export default MachineCard