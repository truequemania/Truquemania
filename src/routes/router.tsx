import { createBrowserRouter } from "react-router-dom";
import Starting from "../1starting/starting";
import Register from "../2register/register";
import Login from "../3login/login";

const router = createBrowserRouter([
  { path: "/", element: <Starting /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

]);

export default router;


// import Starting from "../1starting/starting";
// import Login from "../views/login/Login";
// import VerificacionEmail from "../views/verificacionEmail/VerificacionEmail";
// import Register from "../views/2register/register";

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

// { path: "/login", element: <Login /> },
//   { path: "/verificacionemail", element: <VerificacionEmail /> },
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

