import { FormEvent } from "react";
import axios from "axios";
import { api } from "../../components/ts/urls";
import { mostrarMensaje } from "../../components/tsx/toast";

export interface SesionData {
    token: string;
    name: string;
    email: string;
}

export const Submit = async (
    event: FormEvent,
    email: string,
    password: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>
): Promise<SesionData | null> => {
    event.preventDefault();

    const MensajeErrUsuario = document.getElementById("err");
    const MensajeActUsuario = document.getElementById("success");

    if (email === "") {
        mostrarMensaje("Ingrese su correo", MensajeErrUsuario);
        return null;
    }

    if (password === "") {
        mostrarMensaje("Ingrese su contraseña", MensajeErrUsuario);
        return null;
    }

    function resetForm() {
        setEmail("");
        setPassword("");
    }

    try {
        const responseSesion = await axios.post(`${api}/auth/login`, { email, password });
        const token = responseSesion.data.token;
        const name = responseSesion.data.name;
        const emaile = responseSesion.data.email;
        resetForm();
        mostrarMensaje("Cargando ...", MensajeActUsuario);
        return { token, name, email: emaile };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        resetForm();
        return null;
    }
};

