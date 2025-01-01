import { useEffect, useState } from "react";
import { handleGetUsername } from "../validation/handleGet";
import { handleDelete } from "../validation/handleDelete";
import { Modal } from "../../components/tsx/toast";

function ArticulosTable({
  toggleModalAct,
  toggleModalImagen,
}: {
  toggleModalAct: () => void;
  toggleModalImagen: () => void;
}) {
  useEffect(() => {
    handleGetUsername()
      .then((data) => {
        setArticulos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [articulos, setArticulos] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
      categoria: {
        id: number;
        nombre: string;
        descripcion: string;
      };
      fecha: string;
      estado: string;
      imagen: string;
    }[]
  >([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleActualizar = (
    id: number,
    nombre: string,
    categoria: string | number,
    estado: string,
    fecha: string,
    imagen: string,
    descripcion: string
  ) => {
    const articulo = {
      id,
      nombre,
      categoria,
      estado,
      fecha,
      imagen,
      descripcion,
    };
    localStorage.setItem("articuloSeleccionado", JSON.stringify(articulo));
    toggleModalAct();
  };

  const handleImagen = (id: number, imagen: string) => {
    const articulo = { id, imagen };
    localStorage.setItem("imagenSeleccionado", JSON.stringify(articulo));
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
      {articulos.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-gray-400">
          <p className="text-lg">No hay artículos para mostrar.</p>
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                Categoría
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
            {articulos.map((art, index) => (
              <tr key={index} className="border-b bg-gray-900 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {art.nombre}
                </th>
                <td className="px-6 py-4">{art.descripcion.slice(0, 50)}...</td>
                <td className="px-6 py-4">{art.categoria.nombre}</td>
                <td className="px-6 py-4">{formatFecha(art.fecha)}</td>
                <td className="px-6 py-4">{art.estado}</td>
                <td className="px-6 py-4">
                  <img
                    src={art.imagen}
                    alt=""
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => handleImagen(art.id, art.imagen)}
                  />
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                    onClick={() =>
                      handleActualizar(
                        art.id,
                        art.nombre,
                        art.categoria.id,
                        art.estado,
                        art.fecha,
                        art.imagen,
                        art.descripcion
                      )
                    }
                  >
                    Actualizar
                  </a>
                  <a
                    href="#"
                    onClick={showModal}
                    className="ml-8 font-medium text-red-500 hover:underline"
                  >
                    Eliminar
                  </a>
                  <Modal
                    onConfirm={() => {
                      handleDelete(art);
                      showModal();
                    }}
                    isVisible={isModalVisible}
                    onClose={showModal}
                    message="¿Estás seguro de eliminar la categoría?"
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

export default ArticulosTable;
