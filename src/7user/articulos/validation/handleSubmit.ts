import { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { mostrarMensaje } from "../../../components/tsx/toast";
import { api } from "../../../components/ts/urls";

const token = localStorage.getItem("ACCESS_TOKEN");

interface CampanaResponse {
    message: string;
}
export const handleSubmit = async (
    event: FormEvent,
    id: number, nombre: string, categoria: string,
    estado: string, fecha: string, imagen: string,
    descripcion: string,
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (nombre === "") {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    if (categoria === "") {
        mostrarMensaje("Ingrese la categoría", MensajeErr);
        return null;
    }

    if (estado === "") {
        mostrarMensaje("Ingrese el estado", MensajeErr);
        return null;
    }

    if (fecha === "") {
        mostrarMensaje("Ingrese la fecha", MensajeErr);
        return null;
    }

    if (imagen === "") {
        mostrarMensaje("Ingrese la imagen", MensajeErr);
        return null;
    }

    if (descripcion === "") {
        mostrarMensaje("Ingrese el descripción", MensajeErr);
        return null;
    }

    const userSession = localStorage.getItem('USER_SESSION');

    const email = userSession ? JSON.parse(userSession).email : null;
    const name = userSession ? JSON.parse(userSession).name : null;

    const method = id === 0 ? 'post' : 'patch';
    const url = id === 0 ? `${api}/articulos` : `${api}/articulos/${id}`;

    const requestData = { nombre, categoria, estado, fecha, imagen, descripcion, email, name };

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response: AxiosResponse<CampanaResponse> = await axios[method](url, requestData, { headers });
        mostrarMensaje(response.data.message, MensajeAct);
        return response;
    } catch (error: any) {
        mostrarMensaje(error.response?.data?.message || "Error al enviar los datos", MensajeErr);
        return null;
    }
};