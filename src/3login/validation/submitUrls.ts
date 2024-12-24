import axios from "axios";
import { api } from "../../components/ts/urls";
import { mostrarMensaje } from "../../components/tsx/toast";

export interface TokensData {
    token: any;
    name: string;
    email: string;
}

export const submitUrls= async (tokens: any): Promise<TokensData | null> => {
    const MensajeErrUsuario = document.getElementById("MensajeErrUsuario");
    const MensajeActUsuario = document.getElementById("MensajeActUsuario");

    const isVerified: boolean = true;
    console.log(tokens, "En el submituls");

    try {
        const responseSesion = await axios.patch(`${api}/auth/tokens-verifi`, { isVerified }, {
            headers: {
                Authorization: `Bearer ${tokens}`,
            },
        });
        const token = responseSesion.data.token;
        const name = responseSesion.data.name;
        const emaile = responseSesion.data.email;

        mostrarMensaje(responseSesion.data.message, MensajeActUsuario);
        return { token, name, email: emaile };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        return null;
    }
}