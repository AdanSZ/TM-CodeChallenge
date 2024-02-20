import { IUsers } from "../screens/1.users/query/users.types";

export const multiply = (x: number, y:number) => x * y;

export const search = (searchQuery: string, data: IUsers[]) => {
    if(searchQuery){
      const filter = data?.filter((item) => {
        return item.name.includes(searchQuery)
      })
      if(filter){
        return filter
        // setSearchData(filter)
      } else {
        return []
        // setSearchData([])
      }
    } else {
      return data || []
      // setSearchData(data || [])
    }
  }