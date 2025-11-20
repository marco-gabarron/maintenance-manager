// import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftIcon, ChevronRightIcon } from '../assets/icons'
import { AddIcon } from '../assets/icons'
import AddMachineDialog from '../components/AddMachineDialog'
import Button from '../components/Button'
import MachineCard from '../components/MachineCard'
import Sidebar from '../components/Sidebar'
import { useGetArea, useGetMachines } from '../hooks/data/use-get-machines'

const Maintenance2Page = () => {
  const { areaId } = useParams()
  const { data: area } = useGetArea(areaId)
  const { data: machines } = useGetMachines(areaId)

  const navigate = useNavigate()
  const [addMachineDialogIsOpen, setAddMachineDialogIsOpen] = useState(false)

  const mobilePit = machines?.filter((machine) => machine.plant === 'mobile')
  const fixedPit = machines?.filter((machine) => machine.plant === 'fixed')

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
              {area?.title}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <h1 className="mt-2 text-xl font-semibold">
              {area?.title} Machines
            </h1>

            <div className="flex items-center gap-3">
              {/* If something simple, it can be passed like that () => setAddTaskDialogIsOpen(true) */}
              <Button onClick={() => setAddMachineDialogIsOpen(true)}>
                <AddIcon />
                Add New Machine
              </Button>
              <AddMachineDialog
                isOpen={addMachineDialogIsOpen}
                // If its something more complicated its worth to use like this and create a function up there
                handleClose={() => setAddMachineDialogIsOpen(false)}
                area={area?.title}
                areaId={areaId}
              />
            </div>
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
                  area={area?.title}
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
                  area={area?.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maintenance2Page
