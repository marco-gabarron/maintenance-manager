import { useMutation, useQueryClient } from '@tanstack/react-query'

import { machineMutationKeys } from '../../keys/mutations'
import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddMachine = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: machineMutationKeys.add(),
    mutationFn: async (machine) => {
      //Call API and update with new task
      const { data: createdMachine } = await api.post(
        '/api/create/machine',
        machine
      )
      return createdMachine
    },

    onSuccess: (createdMachine) => {
      queryClient.setQueryData(
        machineQueryKeys.getAllMachines(),
        (oldMachines) => {
          return [...oldMachines, createdMachine]
        }
      )
    },
  })
}
