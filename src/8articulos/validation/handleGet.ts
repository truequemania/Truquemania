import axios from "axios";
import { api } from "../../components/ts/urls";

export async function handleGet() {
    try {
        const response = await axios.get(`${api}/articulos`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function handleGetUsername() {
    try {
        const userSession = localStorage.getItem("USER_SESSION");

        const parsedSession = userSession ? JSON.parse(userSession) : null;
        const email = parsedSession?.email;

        if (!email) {
            throw new Error("El usuario no tiene un nombre almacenado en la sesión.");
        }
        const response = await axios.get(`${api}/articulos/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
