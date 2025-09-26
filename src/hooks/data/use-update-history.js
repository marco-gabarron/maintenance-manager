import { useMutation, useQueryClient } from '@tanstack/react-query'

import { historyMutationKeys } from '../../keys/mutations'
import { historyQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateHistory = (historyId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: historyMutationKeys.update(historyId),
    mutationFn: async (data) => {
      const { data: updatedHistory } = await api.patch(`/history/${historyId}`, {
        date: data?.date?.trim(),
        service: data?.service,
        description: data?.description?.trim(),
        serviceType: data?.serviceType,
        hoursService: data?.hoursService?.trim(),
        mileageService: data?.mileageService?.trim(),
        completedBy: data?.completedBy?.trim(),
      })
      queryClient.setQueryData(historyQueryKeys.getHistories(), (oldHistories) => {
        return oldHistories?.map((oldHistory) => {
          if (oldHistory.id === historyId) {
            return updatedHistory
          }
          return oldHistory
        })
      })
      queryClient.setQueryData(historyQueryKeys.getHistory(historyId), updatedHistory)
    },
  })
}
