import { useMutation, useQueryClient } from '@tanstack/react-query'

import { machineMutationKeys } from '../../keys/mutations'
import { pitQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddMachine = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: machineMutationKeys.add(),
    mutationFn: async (machine) => {
      //Call API and update with new task
      const { data: createdMachine } = await api.post('/maintenance', machine)
      return createdMachine
    },

    onSuccess: (createdMachine) => {
      queryClient.setQueryData(pitQueryKeys.getPit(), (oldMachines) => {
        return [...oldMachines, createdMachine]
      })
    },
  })
}
