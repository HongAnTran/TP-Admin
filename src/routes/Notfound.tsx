import { RouteObject }   from "react-router-dom"

import MinimalLayout from '../layout/MinimalLayout';
import NotFound from "../pages/notfound";
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const NotFoundRoutes : RouteObject = {
    path: '*',
    element: <MinimalLayout />,
    children: [
        {
             path: '*',
            element:<NotFound  />
        }
    ]
};

export default NotFoundRoutes ;
