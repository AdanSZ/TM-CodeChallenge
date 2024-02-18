import { http } from "../../../service/http"
import {IPhotosResponse} from "./photos.types"

export const getAlbumPhotos = async (albumId: number):Promise<IPhotosResponse[]> =>{
    const data = await http.get(`photos`, {albumId})
    return data
}

export const getAllAlbumPhotos = async ():Promise<IPhotosResponse[]> =>{
    const data = await http.get(`photos`)
    return data
}