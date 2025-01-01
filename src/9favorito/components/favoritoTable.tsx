import { useEffect, useState } from "react";
import { handleGetUserId } from "../validation/handleGet";
import { Modal } from "../../components/tsx/toast";
import { handleDelete } from "../validation/handleDelete";

function FavoritoTable({
  toggleModalImagen,
}: {
  toggleModalImagen: () => void;
}) {
  useEffect(() => {
    handleGetUserId()
      .then((data) => {
        setFavorito(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [favorito, setFavorito] = useState<
    {
      id: number;
      articulo: {
        id: number;
        nombre: string;
        estado: string;
        imagen: string;
      };
      fecha: string;
    }[]
  >([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleImagen = (imagen: string) => {
    const favorito = { imagen };
    localStorage.setItem("imagenFavorito", JSON.stringify(favorito));
    toggleModalImagen();
  };

  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {favorito.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-gray-400">
          <p className="text-lg">No hay favoritos para mostrar.</p>
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Imagen
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {favorito.map((fav, index) => (
              <tr key={index} className="border-b bg-gray-900 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {fav.articulo.nombre}
                </th>
                <td className="px-6 py-4">{formatFecha(fav.fecha)}</td>
                <td className="px-6 py-4">{fav.articulo.estado}</td>
                <td className="px-6 py-4">
                  <img
                    src={fav.articulo.imagen}
                    alt=""
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => handleImagen(fav.articulo.imagen)}
                  />
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={showModal}
                    className="ml-8 font-medium text-red-500 hover:underline"
                  >
                    Eliminar
                  </a>
                  <Modal
                    onConfirm={() => {
                      handleDelete(fav.articulo.id);
                      showModal();
                    }}
                    isVisible={isModalVisible}
                    onClose={showModal}
                    message="¿Estás seguro de sacer el artículo de favorito?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FavoritoTable;
