import { LoaderIcon, Tasks2Icon, TasksIcon } from '../assets/icons'
import DashboardCard from '../components/DashboardCard'
import { useGetTasks } from '../hooks/data/use-get-tasks'

const DashboardCards = () => {
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
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="All Tasks"
      />
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={notStartedTasks}
        secondaryText="Open Tasks"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks}
        secondaryText="In Progress Tasks"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        secondaryText="Completed Tasks"
      />
    </div>
  )
}

export default DashboardCards
