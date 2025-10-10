import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import HistoryDetailsPage from './pages/HistoryDetailsPage.jsx'
import HomePage from './pages/home.jsx'
import MachineDetailsPage from './pages/MachineDetailsPage.jsx'
import Maintenance from './pages/Maintenance.jsx'
import Maintenance2Page from './pages/Maintenance2Page.jsx'
import TaskDetailsPage from './pages/TaskDetailsPage.jsx'
import TasksPage from './pages/Tasks.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tasks',
    element: <TasksPage />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage />,
  },
  {
    path: '/maintenance/areas',
    element: <Maintenance />,
  },
  {
    path: '/maintenance/machines/:areaId',
    element: <Maintenance2Page />,
  },
  {
    path: '/maintenance/machine/:machineId',
    element: <MachineDetailsPage />,
  },
  {
    path: '/maintenance/history/:historyId',
    element: <HistoryDetailsPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: '#00ADB5',
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
