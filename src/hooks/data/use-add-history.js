import { useMutation, useQueryClient } from '@tanstack/react-query'

import { historyMutationKeys } from '../../keys/mutations'
import { historyQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddHistory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: historyMutationKeys.add(),
    mutationFn: async (history) => {
      //Call API and update with new task
      const { data: createdHistory } = await api.post(
        '/api/create/history',
        history
      )
      return createdHistory
    },

    onSuccess: (createdHistory) => {
      queryClient.setQueryData(
        historyQueryKeys.getHistories(),
        (oldHistories) => {
          return [...oldHistories, createdHistory]
        }
      )
    },
  })
}
