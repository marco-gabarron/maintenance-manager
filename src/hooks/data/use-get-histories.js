import { useQuery } from '@tanstack/react-query'

import { historyQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetHistories = (machineId) => {
  return useQuery({
    queryKey: historyQueryKeys.getHistories(machineId),
    queryFn: async () => {
      const { data: histories } = await api.get(
        `/maintenance/machine/histories/${machineId}`
      )
      //   const filteredHistories = histories?.filter((history) => history.machineId === machineId)
      // return histories?.filter((history) => history.machineId === machineId)
      return histories
    },
  })
}
