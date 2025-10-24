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
          machine_type: data?.machine_type?.trim(),
          model: data?.model?.trim(),
          plant: data?.plant,
          area_id: data?.area_id,
          manufacturer: data?.manufacturer?.trim(),
          year: data?.year,
          serial_number: data?.serial_number?.trim(),
          brake_test: data?.brake_test,
          service_frequency: data?.service_frequency,
          hours: data?.hours,
          mileage: data?.mileage,
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
