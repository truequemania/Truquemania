import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGet } from "../8articulos/validation/handleGet";
import ArticulosFormImage from "../8articulos/components/articulosFormImagen";
import roleAdmin from "../components/ts/roleAdmin";
import { handleGetFavorito } from "../9favorito/validation/handleGet";
import { handleFavorito } from "../9favorito/validation/Submit";
import { handleDeleteFav } from "../9favorito/validation/handleDelete";

function Explorador() {
  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  const [articulos, setArticulos] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
      fecha: string;
      estado: string;
      imagen: string;
      email: string;
      name: string;
      user: {
        id: number;
        name: string;
      };
    }[]
  >([]);

  const [favoritoIds, setFavoritoIds] = useState<number[]>([]);
  const [isOpenImg, setIsOpenImg] = useState(false);

  useEffect(() => {
    handleGet()
      .then((data) => {
        setArticulos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los artículos:", error);
      });

    handleGetFavorito()
      .then((data) => {
        console.log(data);
        setFavoritoIds(data.map((fav: any) => fav.articulo.id));
      })
      .catch((error) => {
        console.error("Error al obtener los favoritos:", error);
      });
  }, []);

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  const handleImagen = (imagen: string) => {
    const articulo = { imagen };
    localStorage.setItem("imagenSeleccionado", JSON.stringify(articulo));
    toggleModalImagen();
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 relative flex flex-col justify-between h-auto p-4 rounded-lg mt-14 shadow-md">
      {isOpenImg && (
        <ArticulosFormImage toggleModalImagen={toggleModalImagen} />
      )}

      {articulos.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            No hay artículos disponibles
          </h2>
          <p className="text-gray-400 mb-6">
            Por el momento no hay artículos para mostrar. Intenta más tarde.
          </p>
          <img
            src="https://via.placeholder.com/200x200?text=Sin+Articulos"
            alt="Sin artículos"
            className="rounded"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
          {articulos.map((articulo) => (
            <div
              key={articulo.id}
              className="max-w-sm border bg-gray-800 border-gray-700 rounded-lg shadow"
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={articulo.imagen || "https://via.placeholder.com/150"}
                  alt={articulo.nombre}
                  onClick={() => handleImagen(articulo.imagen)}
                />
              </a>
              <div className="p-5">
                <div className="flex justify-center mb-3">
                  <span className="text-sm font-semibold text-orange-400 cursor-pointer">
                    {articulo.user.name}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    Fecha: {new Date(articulo.fecha).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    Estado: {articulo.estado}
                  </span>
                </div>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {articulo.nombre}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-400">
                  {articulo.descripcion.length > 100
                    ? `${articulo.descripcion.substring(0, 100)}...`
                    : articulo.descripcion}
                </p>

                <a
                  href="#"
                  onClick={async (e) => {
                    e.preventDefault();

                    const isFavorito = favoritoIds.includes(articulo.id);

                    try {
                      if (isFavorito) {
                        await handleDeleteFav(articulo.id);
                        setFavoritoIds(
                          favoritoIds.filter((id) => id !== articulo.id)
                        );
                      } else {
                        const addedArticuloId = await handleFavorito(
                          articulo.id
                        );
                        setFavoritoIds([...favoritoIds, addedArticuloId]);
                      }
                    } catch (error) {
                      console.error("Error al actualizar favorito:", error);
                    }
                  }}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg transition duration-300 transform hover:scale-105 focus:ring-4 focus:outline-none ${
                    favoritoIds.includes(articulo.id)
                      ? "bg-green-600 hover:bg-green-700 focus:ring-green-600"
                      : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-600"
                  }`}
                >
                  {favoritoIds.includes(articulo.id)
                    ? "Quitar de favorito"
                    : "Agregar a favorito"}
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Explorador;
