import { useMutation, useQueryClient } from '@tanstack/react-query'

import { historyMutationKeys } from '../../keys/mutations'
import { historyQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateHistory = (historyId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: historyMutationKeys.update(historyId),
    mutationFn: async (data) => {
      const { data: updatedHistory } = await api.patch(
        `/api/update/history/${historyId}`,
        {
          date: data?.date,
          service: data?.service,
          description: data?.description?.trim(),
          serviceType: data?.serviceType,
          hours_service: parseInt(data?.hours_service),
          mileage_service: parseInt(data?.mileage_service),
          completedBy: data?.completedBy?.trim(),
        }
      )
      queryClient.setQueryData(
        historyQueryKeys.getHistories(),
        (oldHistories) => {
          return oldHistories?.map((oldHistory) => {
            if (oldHistory.id === historyId) {
              return updatedHistory
            }
            return oldHistory
          })
        }
      )
      queryClient.setQueryData(
        historyQueryKeys.getHistory(historyId),
        updatedHistory
      )
    },
  })
}
