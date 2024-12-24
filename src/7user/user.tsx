import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/navBar";
import Sidebar from "./components/aside";
import { Modal } from "../components/tsx/toast";

function User() {
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
            navigate(path);
            setIsAsideOpen(false);
        }
    };

    const navLinks = [
        { path: "/explorar", label: "Explorador" },
        { path: "/articulos", label: "Artículos" },
        { path: "/trueques", label: "Trueques" },
        { path: "/favorito", label: "Favoritos" },
        { path: "/perfil", label: "Perfil" },
        { path: "/soporte", label: "Soporte" },
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

export default User;
