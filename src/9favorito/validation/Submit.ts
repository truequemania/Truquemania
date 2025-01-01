import axios from "axios";
import { api } from "../../components/ts/urls";

export const handleFavorito = async (articulo_id: number): Promise<number> => {
  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const user_id = parsedSession?.id;

  if (!articulo_id || !user_id) {
    alert("Faltan datos para enviar el favorito");
    throw new Error("Faltan datos");
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    const response = await axios.post(
      `${api}/favorito`,
      { articulo_id, user_id },
      { headers }
    );
    return response.data.articulo_id;
  } catch (error: any) {
    console.error("Error al agregar favorito:", error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
