import axios from "axios";
import { api } from "../../components/ts/urls";

export const handleDelete = async (articulo_id: number): Promise<void> => {
  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const user_id = parsedSession?.id;

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    const response = await axios.delete(`${api}/favorito`, {
      headers,
      params: { articulo_id, user_id },
    });
    alert(response.data.message);
    window.location.reload();
  } catch (error: any) {
    console.error("Error al eliminar favorito:", error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};

export const handleDeleteFav = async (articulo_id: number): Promise<void> => {
  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const user_id = parsedSession?.id;

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    await axios.delete(`${api}/favorito`, {
      headers,
      params: { articulo_id, user_id },
    });
  } catch (error: any) {
    console.error("Error al eliminar favorito:", error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
