import { useMutation, useQueryClient } from '@tanstack/react-query'

import { machineMutationKeys } from '../../keys/mutations'
import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddMachine = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: machineMutationKeys.add(),
    mutationFn: async (formData) => {
      // Handle both FormData (with file) and regular object (without file)
      const config =
        formData instanceof FormData
          ? {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          : {}

      const { data: createdMachine } = await api.post(
        '/api/create/machine',
        formData,
        config
      )
      return createdMachine[0]
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
