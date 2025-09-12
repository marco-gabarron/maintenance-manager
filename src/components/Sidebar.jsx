import { HomeIcon, TasksIcon } from '../assets/icons'
import SidebarButton from './SidebarButton'

const Sidebar = () => {
  return (
    <div className="h-screen w-72 min-w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Hanlon Concrete
        </h1>
        <p>
          Maintenance Manager
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <HomeIcon />
          Home
        </SidebarButton>
        <SidebarButton href="/tasks">
          <TasksIcon />
          My Tasks
        </SidebarButton>
        <SidebarButton href="/maintenance">
          <TasksIcon />
          Maintenance
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
