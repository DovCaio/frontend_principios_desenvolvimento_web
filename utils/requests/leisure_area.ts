import axios from "axios"
import { url } from "../constants/url"


export const postAnLeisureArea = (name : string, capacity: string) => {
    return  axios.post(`${url}/leisure-areas`, {
        name, capacity: parseInt(capacity)
    })


}

export const deleteLeisureAreaRequest = (id: number) => {

    return  axios.delete(`${url}/leisure-areas/${id}`)

}

export const requestAllLeisureAreas = () => {
    return  axios.get(`${url}/leisure-areas`)

}