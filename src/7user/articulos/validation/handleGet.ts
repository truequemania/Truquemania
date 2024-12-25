import axios from "axios";
import { api } from "../../../components/ts/urls";

export async function handleGet() {
    try {
        const response = await axios.get(`${api}/articulos`);
        return response.data;
    } catch (error) {
        throw error;
    }
}