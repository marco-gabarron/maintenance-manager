import { useQuery } from '@tanstack/react-query'

import { areaQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetAreas = () => {
  return useQuery({
    queryKey: areaQueryKeys.getAreas(),
    queryFn: async () => {
      const { data: areas } = await api.get('/maintenance/areas')
      return areas
    },
  })
}
