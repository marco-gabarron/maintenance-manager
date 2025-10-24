import { useQuery } from '@tanstack/react-query'

import { machineQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetFilteredMachines = (filterKey) => {
  return useQuery({
    queryKey: machineQueryKeys.getFilteredMachines(filterKey),
    queryFn: async () => {
      const { data: areas } = await api.get(
        `/maintenance/machines/${filterKey}`
      )
      return areas
    },
  })
}
