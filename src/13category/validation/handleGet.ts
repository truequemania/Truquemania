import axios from "axios";
import { api } from "../../components/ts/urls";

export async function handleGet() {
    try {
        const response = await axios.get(`${api}/categorias`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

