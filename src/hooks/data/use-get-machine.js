import { useQuery } from '@tanstack/react-query'

import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetMachine = (machineId, reset) => {
  return useQuery({
    queryKey: machineQueryKeys.getOneMachine(machineId),
    queryFn: async () => {
      const { data: machine } = await api.get(`/maintenance/${machineId}`)
      reset(machine)
      return machine
    },
  })
}