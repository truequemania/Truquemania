import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import roleClient from "../components/ts/roleClient";

function CuentasUser() {
  authRedirectNoToken("/login");
  const navigate = useNavigate();

  useEffect(() => {
    roleClient(navigate);
  }, [navigate]);

  return <div>Cuentas usuarios</div>;
}

export default CuentasUser;
