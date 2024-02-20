import {
    useQuery,
  } from '@tanstack/react-query'
import { getUsers } from './users.api'
  


export const useGetUSers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers()
  })