import { useQuery } from '@tanstack/react-query'

import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetHistory = (historyId, reset) => {
  return useQuery({
    queryKey: machineQueryKeys.getHistory(historyId),
    queryFn: async () => {
      const { data: history } = await api.get(`/history/${historyId}`)
      reset(history)
      return history
    }
  })
}