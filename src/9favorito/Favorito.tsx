import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect, useState } from "react";
import roleAdmin from "../components/ts/roleAdmin";
import FavoritoCabecera from "./components/favoritoCabecera";
import FavoritoTable from "./components/favoritoTable";
import FavoritoFormImage from "./components/favoritoFormImagen";

function Favorito() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  const [isOpenImg, setIsOpenImg] = useState(false);

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <FavoritoCabecera />
      <FavoritoTable toggleModalImagen={toggleModalImagen} />
      {isOpenImg && (
        <FavoritoFormImage toggleModalImagen={toggleModalImagen} />
      )} 
    </div>
  );
}

export default Favorito;
