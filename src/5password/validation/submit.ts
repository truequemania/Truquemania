import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/tsx/toast";
import axios from "axios";
import { api } from "../../components/ts/urls";

export interface upEmailData {
    tokens: any;
    name: string;
    email: string;
}

export const Submit = async (
    event: FormEvent,
    password: string,
    verPassword: string,
    setVerPassword: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>
): Promise<upEmailData | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (password === "") {
        mostrarMensaje("Ingrese su nueva contraseña", MensajeErr);
        return null;
    }

    if (verPassword === "") {
        mostrarMensaje("Ingrese la verificación de su nueva contraseña", MensajeErr);
        return null;
    }

    if (password !== verPassword) {
        mostrarMensaje("Las contraseñas no coinciden", MensajeErr);
        return null;
    }

    function resetForm() {
        setPassword("");
        setVerPassword("");
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const responseSesion = await axios.patch(`${api}/users/password`, { password, verPassword }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        resetForm();
        mostrarMensaje(responseSesion.data.message, MensajeAct);

        const tokens = responseSesion.data.tokens;
        const name = responseSesion.data.name;
        const emaile = responseSesion.data.email;

        return { tokens, name, email: emaile };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErr);
        resetForm();
        return null;
    }

};