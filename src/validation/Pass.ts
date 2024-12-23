import { FormEvent } from "react";
import { mostrarMensaje } from "../components/toast";
import axios from "axios";
import { api } from "../general/urls";

export interface upEmailData {
    tokens: any;
    name: string;
    email: string;
    telefone: string;
}

export const handleSubmitPassUpEmail = async (
    event: FormEvent,
    password: string,
    verPassword: string,
    setVerPassword: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>
): Promise<upEmailData | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("MensajeErrEmail");
    const MensajeAct = document.getElementById("MensajeActEmail");

    if (password === "") {
        mostrarMensaje("Ingrese su nueva contraseña", MensajeErr);
        return null;
    }

    if (verPassword === "") {
        mostrarMensaje("Ingrese la verificación", MensajeErr);
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
        const responseSesion = await axios.patch(`${api}/auth/update-password-email`, { password, verPassword }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        resetForm();
        mostrarMensaje(responseSesion.data.message, MensajeAct);

        const tokens = responseSesion.data.tokens;
        const name = responseSesion.data.name;
        const emaile = responseSesion.data.email;
        const telefone = responseSesion.data.telefone;

        return { tokens, name, email: emaile, telefone };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErr);
        resetForm();
        return null;
    }

};