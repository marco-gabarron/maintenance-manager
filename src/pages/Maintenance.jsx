import MaintenanceAreaCards from '../components/MaintenanceAreaCards'
import HeaderMaintenance from '../components/HeaderMaintenance'
import Sidebar from '../components/Sidebar'

function Maintenance() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <HeaderMaintenance subtitle="Maintenance" title="Area" />
        <MaintenanceAreaCards />
      </div>
    </div>
  )
}

export default Maintenance
