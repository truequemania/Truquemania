import { useEffect, useState } from "react";
import { handleGet } from "../validation/handleGet";
import { Modal } from "../../../components/tsx/toast";
import { handleDelete } from "../validation/handleDelete";

function ArticulosTable({ toggleModalAct }: any) {

    useEffect(() => {
        handleGet()
            .then((data) => {
                setArticulos(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [articulos, setArticulos] = useState<
        {
            id: number; nombre: string; descripcion: string; categoria: string; fecha: string; estado: string; imagen: string
        }[]
    >([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleActualizar = (
        id: number, nombre: string, categoria: string,
        estado: string, fecha: string, imagen: string,
        descripcion: string,
    ) => {
        const articulo = { id, nombre, categoria, estado, fecha, imagen, descripcion };
        localStorage.setItem("articuloSeleccionado", JSON.stringify(articulo));
        toggleModalAct();
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nombre</th>
                        <th scope="col" className="px-6 py-3">Descripción</th>
                        <th scope="col" className="px-6 py-3">Categoría</th>
                        <th scope="col" className="px-6 py-3">Fecha</th>
                        <th scope="col" className="px-6 py-3">Estado</th>
                        <th scope="col" className="px-6 py-3">Imagen</th>
                        <th scope="col" className="px-6 py-3">Acción</th>
                    </tr>
                </thead>
                <tbody>

                    {articulos.map((art, index) => (
                        <tr
                            key={index}
                            className=" border-b bg-gray-900 border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap text-white"
                            >
                                {art.nombre}
                            </th>
                            <td className="px-6 py-4">{art.descripcion.slice(0, 50)}...</td>
                            <td className="px-6 py-4">{art.categoria}</td>
                            <td className="px-6 py-4">{art.fecha}</td>
                            <td className="px-6 py-4">{art.estado}</td>
                            <td className="px-6 py-4">
                                <img src={art.imagen} alt="" className="w-12 h-12 rounded-full" />
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-500 hover:underline"
                                    onClick={() =>
                                        handleActualizar(
                                            art.id,
                                            art.nombre,
                                            art.categoria,
                                            art.estado,
                                            art.fecha,
                                            art.imagen,
                                            art.descripcion,
                                        )
                                    }
                                >
                                    Actualizar
                                </a>
                                <a href="#"
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
                                    message="¿Estás seguro de eliminar el artículo?"
                                />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default ArticulosTable;