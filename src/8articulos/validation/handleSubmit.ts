import { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
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
  categoria: string,
  estado: string,
  imagen: File | null,
  descripcion: string
): Promise<AxiosResponse<CampanaResponse> | null> => {
  event.preventDefault();
  const MensajeErr = document.getElementById("err");
  const MensajeAct = document.getElementById("success");

  if (!nombre) {
    mostrarMensaje("Ingrese el nombre", MensajeErr);
    return null;
  }

  if (!categoria) {
    mostrarMensaje("Ingrese la categoría", MensajeErr);
    return null;
  }

  if (!estado) {
    mostrarMensaje("Ingrese el estado", MensajeErr);
    return null;
  }

  if (id === 0 && !imagen) {
    mostrarMensaje("Ingrese la imagen", MensajeErr);
    return null;
  }

  if (!descripcion) {
    mostrarMensaje("Ingrese la descripción", MensajeErr);
    return null;
  }

  const userSession = localStorage.getItem("USER_SESSION");
  const email = userSession ? JSON.parse(userSession).email : null;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    let response: AxiosResponse<CampanaResponse>;

    if (id === 0) {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("categoria", categoria);
      formData.append("estado", estado);
      if (imagen) formData.append("imagen", imagen);
      formData.append("descripcion", descripcion);
      if (email) formData.append("email", email);

      response = await axios.post(`${api}/articulos`, formData, { headers });
    } else {
      const updateData = {
        nombre,
        categoria,
        estado,
        descripcion,
        email,
      };

      response = await axios.patch(`${api}/articulos/${id}`, updateData, {
        headers,
      });
    }

    mostrarMensaje(response.data.message, MensajeAct);
    return response;
  } catch (error: any) {
    console.error("Error en la solicitud:", error);
    mostrarMensaje(
      error.response?.data?.message || "Error al enviar los datos",
      MensajeErr
    );
    return null;
  }
};
