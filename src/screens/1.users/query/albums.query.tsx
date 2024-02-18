
import { useMutation } from '@tanstack/react-query'
import { getAlbums } from './albums.api'
  
export const useGetAlbums = () => useMutation({
    mutationKey: ['getAlbums'],
    mutationFn: (userId: number) => {
      return getAlbums(userId)
    }
  })