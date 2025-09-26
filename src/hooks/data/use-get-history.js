import { useQuery } from '@tanstack/react-query'

import { historyQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetHistory = (historyId, reset) => {
  return useQuery({
    queryKey: historyQueryKeys.getHistory(historyId),
    queryFn: async () => {
      const { data: history } = await api.get(`/history/${historyId}`)
      reset(history)
      return history
    }
  })
}