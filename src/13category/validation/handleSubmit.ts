import axios, { AxiosResponse } from "axios";
import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/tsx/toast";
import { api } from "../../components/ts/urls";

const token = localStorage.getItem("ACCESS_TOKEN");

interface CampanaResponse {
    message: string;
}

export const handleSubmit = async (
    event: FormEvent,
    id: number,
    nombre: string,
    descripcion: string
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (!nombre) {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    if (!descripcion) {
        mostrarMensaje("Ingrese la descripción", MensajeErr);
        return null;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = id === 0
            ? await axios.post<CampanaResponse>(
                `${api}/categorias`,
                { nombre, descripcion },
                { headers }
              )
            : await axios.patch<CampanaResponse>(
                `${api}/categorias/${id}`,
                { nombre, descripcion },
                { headers }
              );

        mostrarMensaje(response.data.message, MensajeAct);
        return response;
    } catch (error: any) {
        console.error("Error en la solicitud:", error);
        mostrarMensaje(error.response?.data?.message || "Error al enviar los datos", MensajeErr);
        return null;
    }
};
