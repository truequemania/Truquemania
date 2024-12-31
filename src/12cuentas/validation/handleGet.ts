import axios from "axios";
import { api } from "../../components/ts/urls";

export async function handleGet(userName: string) {
    try {
        const response = await axios.get(`${api}/perfiles`, {
            params: { username: userName },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
