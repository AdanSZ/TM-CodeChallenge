import {
    useQuery,
  } from '@tanstack/react-query'
import { getAlbumPhotos, getAllAlbumPhotos } from './photos.api'
  
export const useGetAlbumPhotos = (albumId: number) => useQuery({
    queryKey: ['photos'],
    queryFn: () => getAlbumPhotos(albumId)
  })

export const useGetAllAlbumPhotos = () => useQuery({
    queryKey: ['allPhotos'],
    queryFn: () => getAllAlbumPhotos()
  })