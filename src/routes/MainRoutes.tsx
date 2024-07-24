import { lazy } from 'react';
import { RouteObject } from "react-router-dom"

// project imports
import Loadable from '../ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
import PrivateRouter from '@/utils/PrivateRouter';


const Dashboard = Loadable(lazy(() => import('@/pages/dashboard/Dashboard')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const MainRoutes: RouteObject = {
    path: '/',
    element: <PrivateRouter >
        <MainLayout />
    </PrivateRouter>,
    children: [
        {
            path:'',
            element: <Dashboard />,
        }

    ]

    // ]
};

export default MainRoutes;
