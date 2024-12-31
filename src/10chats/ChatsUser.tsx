import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import roleClient from "../components/ts/roleClient";

function ChatsUser() {
  authRedirectNoToken("/login");
  const navigate = useNavigate();

  useEffect(() => {
    roleClient(navigate);
  }, [navigate]);

  return <div>Chats usuarios</div>;
}

export default ChatsUser;
