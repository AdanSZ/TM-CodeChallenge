import { http } from "../../../service/http"
import { IAlbum } from "./albums.types"

export const getAlbums = async (userId: number):Promise<IAlbum[]> =>{
    const data = await http.get(`albums`, {userId: userId})
    return data
}