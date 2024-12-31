import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import roleClient from "../components/ts/roleClient";
import User from "./validation/user";
import CategoriaCabecera from "./components/categoriaCabecera";
import CategoriaTable from "./components/categoriaTable";
import CategoriaForm from "./components/categoriaForm";

function Category() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleClient(navigate);
  }, [navigate]);

  const { setId, setNombre, setDescripcion, isOpen, setIsOpen } = User();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setId(0);
    setNombre("");
    setDescripcion("");
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <CategoriaCabecera toggleModal={toggleModal} />
      <CategoriaTable toggleModalAct={toggleModalAct} />
      {isOpen && <CategoriaForm toggleModal={toggleModal} />}
    </div>
  );
}

export default Category;
