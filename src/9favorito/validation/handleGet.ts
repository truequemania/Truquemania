import axios from "axios";
import { api } from "../../components/ts/urls";

export const handleGetFavorito = async () => {
  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const user_id = parsedSession?.id;

  try {
    const response = await axios.get(`${api}/favorito/${user_id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener los favoritos:", error);
    return [];
  }
};

export async function handleGetUserId() {
  try {
    const userSession = localStorage.getItem("USER_SESSION");

    const parsedSession = userSession ? JSON.parse(userSession) : null;
    const id = parsedSession?.id;

    if (!id) {
      throw new Error("El usuario no existe.");
    }
    const response = await axios.get(`${api}/favorito/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
