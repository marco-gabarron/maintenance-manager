import { LoaderIcon, Tasks2Icon, TasksIcon } from '../assets/icons'
import MaintenanceAreaCard from '../components/MaintenanceAreaCard'
import { useGetTasks } from '../hooks/data/use-get-tasks'

const MaintenanceAreaCards = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter(
    (tasks) => tasks.status === 'not_started'
  ).length
  const inProgressTasks = tasks?.filter(
    (tasks) => tasks.status === 'in_progress'
  ).length
  const completedTasks = tasks?.filter(
    (tasks) => tasks.status === 'done'
  ).length

  return (
    <div className="grid grid-cols-5 gap-6">
      <MaintenanceAreaCard
        mainText='Pit'
        secondaryText="Excavator, Dumper, Loading Shovel, Generator, Jaw, Barmax VSI, ConeCrusher"
      />
      <MaintenanceAreaCard
        mainText='Concrete'
        secondaryText="Mixer, Loading Shovel. Mini-Digger, Powerwasher"
      />
      <MaintenanceAreaCard
        mainText='Blocks'
        secondaryText="Mixer, Block, Strapper, Strapper Head, Forklift"
      />
      <MaintenanceAreaCard
        mainText='Precast'
        secondaryText="Forklift, Megacast, Pallet Handler"
      />
       <MaintenanceAreaCard
        mainText='Yard'
        secondaryText="Forklift, Compressor"
      />
    </div>
      )
}

export default MaintenanceAreaCards