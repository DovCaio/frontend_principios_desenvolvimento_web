import axios from "axios"
import { url } from "../constants/url"


export const postAnLeisureArea = (name : string, capacity: string) => {
    const result =  axios.post(`${url}/leisure-areas`, {
        name, capacity: parseInt(capacity)
    })


    console.log(result)
}