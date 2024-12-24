import { createBrowserRouter } from "react-router-dom";
import Starting from "../1starting/starting";
import Register from "../2register/register";
import Login from "../3login/login";
import Email from "../4email/email";
import Password from "../5password/password";
import Verification from "../6verification/verification";
import User from "../7user/user";
import Explorador from "../7user/explorador/Explorador";
import Articulos from "../7user/articulos/Articulos";
import Trueques from "../7user/trueques/Trueques";
import Favorito from "../7user/favorito/Favorito";
import Perfil from "../7user/perfil/Perfil";
import Soporte from "../7user/soporte/Soporte";
import NotFound from "../components/tsx/notFound";

const router = createBrowserRouter([
  { path: "/", element: <Starting /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/email", element: <Email /> },
  { path: "/password", element: <Password /> },
  { path: "/verification", element: <Verification /> },
  {
    path: "/",
    element: <User />,
    children: [
      { path: "/explorar", element: <Explorador /> },
      { path: "/articulos", element: <Articulos /> },
      { path: "/trueques", element: <Trueques /> },
      { path: "/favorito", element: <Favorito /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/soporte", element: <Soporte /> }
    ]
  },

  { path: "*", element: <NotFound /> }
]);


export default router;

