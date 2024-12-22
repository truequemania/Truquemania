import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home/Home";
import Register from "../views/register/Register";
import Login from "../views/login/Login";

// import EmailVerification from "../views/verificacionEmail/VerificacionEmail";
// import ActContrasena from "../views/ActualizarContraseña";
// import Explorador from "../views/Explorador";
// import Emailverifi from "../views/revisarCorreo/RevisarCorreo";
// import Header from "../components/userHome/header";
// import Articulos from "../views/Articulos";
// import Trueques from "../views/trueques/Trueques";
// import Favorito from "../views/favorito/Favorito";
// import Perfil from "../views/perfil/Perfil";
// import Soporte from "../views/soporte/Soporte";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  // { path: "/emailverificacion", element: <EmailVerification /> },
  // { path: "/actualizacion", element: <ActContrasena /> },
  // { path: "/verificacion", element: <Emailverifi /> },
  // {
  //   path: "/",
  //   element: <Header />,
  //   children: [
  //     { path: "/explorar", element: <Explorador /> },
  //     { path: "/articulos", element: <Articulos /> },
  //     { path: "/trueques", element: <Trueques /> },
  //     { path: "/favorito", element: <Favorito /> },
  //     { path: "/perfil", element: <Perfil /> },
  //     { path: "/soporte", element: <Soporte /> }
  //   ]
  // },

]);

export default router;



