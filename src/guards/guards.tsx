import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const AuthGuard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem("USER_SESSION");
    if (!userSession) {
      navigate("/woody-sesion");
      return;
    }

    const user = JSON.parse(userSession);
    setUser(user);
  }, [navigate]);

  useEffect(() => {
    if (user && !isRedirected) {
      const redirectRoutes = {
        "client": "/explorar",
        "admin": "/categorias",
      };

      const { paper, verificado } = user;
      if (paper && !verificado && redirectRoutes[paper]) {
        setIsRedirected(true);
        navigate(redirectRoutes[paper]);
      } 
    }
  }, [user, isRedirected, navigate]);

  return <></>;
};

export default AuthGuard;