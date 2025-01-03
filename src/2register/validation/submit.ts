import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/tsx/toast";
import { api } from "../../components/ts/urls";

export const Submit = async (
    event: FormEvent,
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setisVerified: React.Dispatch<React.SetStateAction<boolean>>
) => {
    event.preventDefault();
    
    const MensajeErrUsuario = document.getElementById("err");
    const MensajeActUsuario = document.getElementById("success");

    if (name === "") {
        mostrarMensaje("Ingrese su nombre", MensajeErrUsuario);
        return false;
    }

    if (email === "") {
        mostrarMensaje("Ingrese su correo", MensajeErrUsuario);
        return false;
    }

    if (password === "") {
        mostrarMensaje("Ingrese su password", MensajeErrUsuario);
        return false;
    }

    function resetForm() {
        setName("");
        setEmail("");
        setPassword("");
        setisVerified(false);
    }

    try {
        const role = "client";
        const responseRegister = await axios.post(`${api}/users/register`, { name, email, password, isVerified, role });
        const mensaje = responseRegister.data.message;
        mostrarMensaje(mensaje, MensajeActUsuario);
        resetForm();
        return true;
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        resetForm();
        return false;
    }
};
