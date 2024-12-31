import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import roleAdmin from "../components/ts/roleAdmin";

function Favorito() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  return <div>favorito</div>;
}

export default Favorito;
