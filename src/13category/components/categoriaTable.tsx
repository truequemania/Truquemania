import { useEffect, useState } from "react";
import { Modal } from "../../components/tsx/toast";
import { handleDelete } from "../validation/handleDelete";
import { handleGet } from "../validation/handleGet";

function CategoriaTable({ toggleModalAct }: { toggleModalAct: () => void }) {
  const [categorias, setCategorias] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
    }[]
  >([]);

  useEffect(() => {
    handleGet()
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleActualizar = (
    id: number,
    nombre: string,
    descripcion: string
  ) => {
    const categoria = { id, nombre, descripcion };
    localStorage.setItem("categoriaSeleccionado", JSON.stringify(categoria));
    toggleModalAct();
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {categorias.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-gray-400">
          <p className="text-lg">No hay categorías para mostrar.</p>
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
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat, index) => (
              <tr key={index} className="border-b bg-gray-900 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {cat.nombre}
                </th>
                <td className="px-6 py-4">{cat.descripcion.slice(0, 50)}...</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                    onClick={() =>
                      handleActualizar(cat.id, cat.nombre, cat.descripcion)
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
                      handleDelete(cat);
                      showModal();
                    }}
                    isVisible={isModalVisible}
                    onClose={showModal}
                    message="¿Estás seguro de eliminar el categoría?"
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

export default CategoriaTable;
