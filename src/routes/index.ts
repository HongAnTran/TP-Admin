import { createBrowserRouter } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import NotFoundRoutes from "./Notfound";
import MainRoutes from "./MainRoutes";



const router = createBrowserRouter([
    MainRoutes,
    AuthenticationRoutes,
    NotFoundRoutes
]);

export default router