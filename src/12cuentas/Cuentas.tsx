import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleGet } from "./validation/handleGet";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";

function Cuentas() {

    authRedirectNoToken("/login");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [articulos, setArticulos] = useState<
        {
            id: number;
            nombre: string;
            descripcion: string;
            categoria: string;
            fecha: string;
            estado: string;
            imagen: string;
            email: string;
            name: string;
            favorito: boolean;
        }[]
    >([]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const location = useLocation();
    const userName = location.state?.name || "Usuario";

    useEffect(() => {
        handleGet(userName)
            .then((data) => {
                setArticulos(data);
            })
            .catch((error) => {
                alert("Error al obtener el usuario");
                console.error("Error al obtener los art:", error);
            });
    }, [userName]);

    return (
        <div className="mt-20 bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md flex justify-center items-center min-h-screen">
            <div className="w-full max-w-4xl border rounded-lg shadow bg-gray-800 border-gray-700">

                <div className="flex justify-end px-4 pt-4 relative">
                    <button
                        onClick={toggleDropdown}
                        className="inline-block text-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 rounded-lg text-sm p-1.5"
                        type="button"
                    >
                        <span className="sr-only">Open dropdown</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                        >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                    </button>

                    <div
                        className={`absolute top-12 right-4 z-10 text-base list-none divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 ${isDropdownOpen ? "block" : "hidden"
                            }`}
                    >
                        <ul className="py-2">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                                >
                                    Actualizar información
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                                >
                                    Cambiar contraseña
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                                >
                                    Verifícate
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center pb-10">
                    <img
                        className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full shadow-lg"
                        src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                        alt="User profile"
                    />
                    <h5 className="mb-1 text-lg sm:text-xl font-medium text-white">
                        {articulos[0]?.name || "Nombre no disponible"}
                    </h5>
                    <span className="text-sm text-gray-400">
                        {articulos[0]?.email || "Correo no disponible"}
                    </span>
                    <p className="mt-2 text-sm sm:text-base text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, dolores distinctio.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
                    <div className="text-center">
                        <h5 className="text-lg sm:text-xl font-medium text-white">
                            Intercambios
                        </h5>
                        <p className="text-sm text-gray-400">
                            0
                        </p>
                    </div>
                    <div className="text-center">
                        <h5 className="text-lg sm:text-xl font-medium text-white">
                            Puntuación
                        </h5>
                        <p className="text-sm text-gray-400">
                            0
                        </p>
                    </div>
                    <div className="text-center">
                        <h5 className="text-lg sm:text-xl font-medium text-white">
                            Verificación
                        </h5>
                        <p className="text-sm text-gray-400">
                            Completada
                        </p>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
                        Artículos
                    </h3>
                    {articulos.length === 0 ? (
                        <p className="text-sm text-gray-400">No hay artículos disponibles.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {articulos.map((articulo) => (
                                <div
                                    key={articulo.id}
                                    className="bg-gray-700 p-4 rounded-lg shadow"
                                >
                                    <img
                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                        src={articulo.imagen}
                                        alt={articulo.nombre}
                                    />
                                    <h4 className="font-medium text-white">{articulo.nombre}</h4>
                                    <p className="text-sm text-gray-400">
                                        {articulo.descripcion}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Categoría: {articulo.categoria}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    <h3 className="text-lg sm:text-xl font-medium text-white mt-6 mb-4">
                        Favoritos
                    </h3>
                    {articulos.filter((articulo) => articulo.favorito).length === 0 ? (
                        <p className="text-sm text-gray-400">No tienes artículos favoritos.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {articulos
                                .filter((articulo) => articulo.favorito)
                                .map((articulo) => (
                                    <div
                                        key={articulo.id}
                                        className="bg-gray-700 p-4 rounded-lg shadow"
                                    >
                                        <img
                                            className="w-full h-32 object-cover rounded-lg mb-4"
                                            src={articulo.imagen}
                                            alt={articulo.nombre}
                                        />
                                        <h4 className="font-medium text-white">
                                            {articulo.nombre}
                                        </h4>
                                        <p className="text-sm text-gray-400">
                                            {articulo.descripcion}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Categoría: {articulo.categoria}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Cuentas;



