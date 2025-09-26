import { useMutation, useQueryClient } from '@tanstack/react-query'

import { historyMutationKeys } from '../../keys/mutations'
import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useDeleteHistory = (machineId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: historyMutationKeys.delete(machineId),
    mutationFn: async () => {
      const { data: deletedHistory } = await api.delete(`/maintenance/${machineId}`)
      return deletedHistory
    },
    onSuccess: (deletedHistory) => {
      queryClient.setQueryData(machineQueryKeys.getAll(), (currentHistory) => {
        return currentHistory.filter((oldHistory) => oldHistory.id != deletedHistory.id)
      })
    },
  })
}
