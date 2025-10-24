import HeaderMaintenance from '../components/HeaderMaintenance'
import MaintenanceAreaCards from '../components/MaintenanceAreaCards'
import MaintenanceFilterLinksCards from '../components/MaintenanceFilterLinksCards'
import Sidebar from '../components/Sidebar'

function Maintenance() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <HeaderMaintenance subtitle="Maintenance" title="Home" />
        <MaintenanceAreaCards />
        <MaintenanceFilterLinksCards />
      </div>
    </div>
  )
}

export default Maintenance
