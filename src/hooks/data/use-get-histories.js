import { useQuery } from '@tanstack/react-query'

import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetHistories = (machineId) => {
  return useQuery({
    queryKey: machineQueryKeys.getHistories(machineId),
    queryFn: async () => {
      const { data: histories } = await api.get(`/history`)
    //   const filteredHistories = histories?.filter((history) => history.machineId === machineId)
      return histories?.filter((history) => history.machineId === machineId)
    }
  })
}