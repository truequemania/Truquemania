import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./navBar";
import Sidebar from "./aside";
import { Modal } from "./toast";

function UserAdmin() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsLogged(!!token);
  }, []);

  const showModal = () => setIsModalVisible(!isModalVisible);
  const toggleAside = () => setIsAsideOpen(!isAsideOpen);

  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_SESSION");
    setIsLogged(false);
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    if (!isLogged) {
      navigate("/login");
    } else {
      if (path === "/perfil") {
        const userSession = localStorage.getItem("USER_SESSION");
        let userName = "Usuario";
        if (userSession) {
          try {
            const parsedSession = JSON.parse(userSession);
            userName = parsedSession.name || "Usuario";
          } catch (error) {
            console.error("Error al parsear USER_SESSION:", error);
          }
        }
        navigate(path, { state: { name: userName } });
      } else {
        navigate(path);
      }
      setIsAsideOpen(false);
    }
  };

  const navLinks = [
    { path: "/categoriasUser", label: "Categorías" },
    { path: "/verificationUser", label: "Verificación" },
    { path: "/chatsUser", label: "Chats" },
  ];

  return (
    <>
      <NavBar toggleAside={toggleAside} />
      <Sidebar
        isAsideOpen={isAsideOpen}
        handleNavigation={handleNavigation}
        navLinks={navLinks}
        showModal={showModal}
        isLogged={isLogged}
      />
      <div className={`transition-all ${isAsideOpen ? "lg:ml-64" : "ml-0"}`}>
        <Outlet />
      </div>
      <Modal
        onConfirm={() => {
          logOut();
          showModal();
        }}
        isVisible={isModalVisible}
        onClose={showModal}
        message="¿Estás seguro de cerrar sesión?"
      />
    </>
  );
}

export default UserAdmin;
