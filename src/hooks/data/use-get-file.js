import { useQuery } from '@tanstack/react-query'

import { fileQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetFile = (fileName, originalSource) => {
  return useQuery({
    queryKey: fileQueryKeys.getFile(fileName, originalSource),
    queryFn: async () => {
      const { data: file } = await api.get(`/api/downloads/${fileName}`, {
        responseType: 'blob', // Important for file downloads
        params: { originalSource }, // Pass as query param
      })
      return file
    },
    enabled: !!fileName, // Only fetch if fileName exists
  })
}
