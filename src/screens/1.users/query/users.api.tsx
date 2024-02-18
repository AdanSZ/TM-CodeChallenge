import { http } from "../../../service/http"
import {IUsers} from "./users.types"

export const getUsers = async ():Promise<IUsers[]> =>{
    const data = await http.get(`users`)
    return data
}