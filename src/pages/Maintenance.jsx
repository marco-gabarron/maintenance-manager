import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '@/contexts/AuthContext'

import HeaderMaintenance from '../components/HeaderMaintenance'
import MaintenanceAreaCards from '../components/MaintenanceAreaCards'
import MaintenanceFilterLinksCards from '../components/MaintenanceFilterLinksCards'
import Sidebar from '../components/Sidebar'

function Maintenance() {
  const { isInitializing, user, logout } = useContext(AuthContext)

  if (isInitializing) return null // or a loading spinner
  if (!user) {
    return <Navigate to="/" /> // or a message saying that the user is not authenticated, but in this case we will just show the login form, so we can return null here
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <HeaderMaintenance
          subtitle="Maintenance"
          title="Home"
          logout={logout}
        />
        <MaintenanceAreaCards />
        <MaintenanceFilterLinksCards />
      </div>
    </div>
  )
}

export default Maintenance
