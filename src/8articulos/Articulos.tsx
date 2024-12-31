import User from "./validation/user";
import ArticulosTable from "./components/articulosTable";
import ArticulosCabecera from "./components/articulosCabecera";
import ArticulosForm from "./components/articulosForm";
import ArticulosFormImage from "./components/articulosFormImagen";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import roleAdmin from "../components/ts/roleAdmin";

function Articulos() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  const {
    setId,
    setNombre,
    setDescripcion,
    setCategoria,
    setEstado,
    setImagen,
    isOpen,
    setIsOpen,
    isOpenImg,
    setIsOpenImg,
  } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setImagen(null);
    setIsOpen(!isOpen);
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setImagen(null);
    setIsOpen(!isOpen);
  };

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <ArticulosCabecera toggleModal={toggleModal} />
      <ArticulosTable
        toggleModalAct={toggleModalAct}
        toggleModalImagen={toggleModalImagen}
      />
      {isOpen && <ArticulosForm toggleModal={toggleModal} />}
      {isOpenImg && (
        <ArticulosFormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default Articulos;
