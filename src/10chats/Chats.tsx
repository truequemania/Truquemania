import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import roleAdmin from "../components/ts/roleAdmin";

function Chats() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  return <div>Chats</div>;
}

export default Chats;
