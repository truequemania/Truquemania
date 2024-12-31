import { useEffect } from "react";
import User from "../validation/user";
import Handle from "../validation/handle";
import Message from "../../components/tsx/message";


function CategoriaForm({ toggleModal }: any) {

    const { id, setId, nombre, setNombre, descripcion, setDescripcion, isOpen } = User();

    const { handleSubmitForm, isLoading } = Handle(id, nombre, descripcion);

    useEffect(() => {
        if (toggleModal) {
            const articuloSeleccionado = localStorage.getItem("categoriaSeleccionado");
            if (articuloSeleccionado) {
                const articulo = JSON.parse(articuloSeleccionado);
                setId(articulo.id || "");
                setNombre(articulo.nombre || "");
                setDescripcion(articulo.descripcion || "");
            }
        }
    }, [toggleModal]);

    const handleClose = () => {
        localStorage.removeItem("categoriaSeleccionado");
        toggleModal();
    };

    return (
        <div
            id="authentication-modal"
            className="bg-gray-100 bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
            aria-hidden={!isOpen ? "true" : undefined}
        >
            <div
                className="relative w-full max-w-md max-h-full"
                aria-hidden={isOpen ? "false" : "true"}
            >
                <div className="relative bg-gray-900 rounded-lg shadow-lg">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        data-modal-hide="authentication-modal"
                        onClick={handleClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-white">Categorías</h3>
                        <Message />
                        <form className="space-y-6" onSubmit={handleSubmitForm}>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-white">Nombre</label>
                                    <input
                                        type="text"
                                        className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Descripción</label>
                                <textarea
                                    placeholder="Descripción"
                                    className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="mb-10 mt-5 w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Agregando..." : "Agregar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriaForm;
