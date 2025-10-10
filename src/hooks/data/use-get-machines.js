import { useQuery } from '@tanstack/react-query'

import { areaQueryKeys, machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetMachines = (areaId) => {
  return useQuery({
    queryKey: machineQueryKeys.getAllMachines(),
    queryFn: async () => {
      const { data: areas } = await api.get(`/maintenance/machines/${areaId}`)
      return areas
    },
  })
}

export const useGetArea = (areaId) => {
  return useQuery({
    queryKey: areaQueryKeys.getOneArea(areaId),
    queryFn: async () => {
      const { data: area } = await api.get(`/maintenance/areas/${areaId}`)
      return area
    },
  })
}
