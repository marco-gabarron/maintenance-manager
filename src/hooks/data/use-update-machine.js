import { useMutation, useQueryClient } from '@tanstack/react-query'

import { machineMutationKeys } from '../../keys/mutations'
import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateMachine = (machineId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: machineMutationKeys.update(machineId),
    mutationFn: async (data) => {
      const { data: updatedMachine } = await api.patch(`/maintenance/${machineId}`, {
        title: data?.title?.trim(),
        area: data?.area,
        manufacturer: data?.manufacturer?.trim(),
        year: data?.year?.trim(),
        serial: data?.serial?.trim(),
        serviceFrequency: data?.serviceFrequency,
        hours: data?.hours?.trim(),
        mileage: data?.mileage?.trim(),
        status: data?.status,
      })
      queryClient.setQueryData(machineQueryKeys.getAll(), (oldMachines) => {
        return oldMachines.map((oldMachine) => {
          if (oldMachine.id === machineId) {
            return updatedMachine
          }
          return oldMachine
        })
      })
      queryClient.setQueryData(machineQueryKeys.getOne(machineId), updatedMachine)
    },
  })
}
