import axios from "axios";
import { mostrarMensaje } from "../../components/tsx/toast";
import { api } from "../../components/ts/urls";
const token = localStorage.getItem("ACCESS_TOKEN");


export function handleDelete(art: any) {
    const id = art.id;
    const MensajeNegToast = document.getElementById("toast-negative");

    axios
        .delete(`${api}/articulos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            if (error.response) {
                mostrarMensaje(error.response.data.error, MensajeNegToast);
            }
        });
}