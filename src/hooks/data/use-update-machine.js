import { useMutation, useQueryClient } from '@tanstack/react-query'

import { machineMutationKeys } from '../../keys/mutations'
import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateMachine = (machineId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: machineMutationKeys.update(machineId),
    mutationFn: async (data) => {
      const { data: updatedMachine } = await api.patch(
        `/api/update/machine/${machineId}`,
        {
          model: data?.model?.trim(),
          area_id: data?.area_id,
          manufacturer: data?.manufacturer?.trim(),
          year: data?.year?.trim(),
          serial_number: data?.serial_number?.trim(),
          service_frequency: data?.service_frequency,
          hours: data?.hours?.trim(),
          mileage: data?.mileage?.trim(),
          status: data?.status,
        }
      )
      queryClient.setQueryData(
        machineQueryKeys.getAllMachines(),
        (oldMachines) => {
          return oldMachines?.map((oldMachine) => {
            if (oldMachine.id === machineId) {
              return updatedMachine
            }
            return oldMachine
          })
        }
      )
      queryClient.setQueryData(
        machineQueryKeys.getOneMachine(machineId),
        updatedMachine
      )
    },
  })
}
