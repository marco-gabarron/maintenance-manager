// import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftIcon, ChevronRightIcon } from '../assets/icons'
import MachineCard from '../components/MachineCard'
import Sidebar from '../components/Sidebar'
import { useGetFilteredMachines } from '../hooks/data/use-get-filteredmachines'

const MachinesFilteredPage = () => {
  const { filterKey } = useParams()
  // const { data: pit } = useGetPit()
  const { data: machines } = useGetFilteredMachines(filterKey)

  const navigate = useNavigate()

  const mobilePit = machines?.filter((machine) => machine.plant === 'mobile')
  const fixedPit = machines?.filter((machine) => machine.plant === 'fixed')

  const filterKeyTitle =
    filterKey === 'archived'
      ? 'Archived'
      : filterKey === 'summary'
        ? 'Summary'
        : filterKey === 'braketest'
          ? 'Brake Test'
          : 'Not Found'

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div>
          <button
            onClick={handleBackClick}
            className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
          >
            <ArrowLeftIcon />
          </button>

          {/* Left Side */}
          <div className="flex items-center gap-1 text-xs">
            <Link
              to="/maintenance"
              className="cursor-pointer text-brand-text-gray"
            >
              Maintenance
            </Link>
            <ChevronRightIcon className="text-brand-text-gray" />
            <span className="font-semibold text-brand-primary">
              {filterKeyTitle}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <h1 className="mt-2 text-xl font-semibold">
              {filterKeyTitle} Machines
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16">
          <div className="text-center">
            <h1 className="my-2 text-xl font-semibold">Mobile Plant:</h1>
            <div className="grid grid-cols-2 gap-2">
              {mobilePit?.map((machine) => (
                <MachineCard
                  key={machine.id}
                  id={machine.id}
                  machineTypeText={machine.machine_type}
                  mainText={machine.model}
                  statusText={machine.status}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <h1 className="my-2 text-xl font-semibold">Fixed Plant:</h1>

            <div className="grid grid-cols-2 gap-2">
              {fixedPit?.map((machine) => (
                <MachineCard
                  key={machine.id}
                  id={machine.id}
                  machineTypeText={machine.machine_type}
                  mainText={machine.model}
                  statusText={machine.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MachinesFilteredPage
