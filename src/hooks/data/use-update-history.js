import { useMutation, useQueryClient } from '@tanstack/react-query'

import { machineMutationKeys } from '../../keys/mutations'
import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateHistory = (machineId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: machineMutationKeys.update(machineId),
    mutationFn: async (data) => {
      const { data: updatedHistory } = await api.patch(`/maintenance/${machineId}`, {
        title: data?.title?.trim(),
        area: data?.area?.trim(),
        plant: data?.plant,
      })
      queryClient.setQueryData(machineQueryKeys.getAll(), (oldHistories) => {
        return oldHistories.map((oldHistory) => {
          if (oldHistory.id === machineId) {
            return updatedHistory
          }
          return oldHistory
        })
      })
      queryClient.setQueryData(machineQueryKeys.getOne(machineId), updatedHistory)
    },
  })
}
