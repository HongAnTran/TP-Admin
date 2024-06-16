import { lazy } from 'react';
import { RouteObject } from "react-router-dom"

// project imports
import Loadable from '../ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
import PrivateRouter from '@/utils/PrivateRouter';
// login option 3 routing
const Dashboard = Loadable(lazy(() => import('@/pages/dashboard/index')));
const Product = Loadable(lazy(() => import('@/pages/product/Product')));
const ProductAdd = Loadable(lazy(() => import('@/pages/product/ProductAdd')));
const ProductEdit = Loadable(lazy(() => import('@/pages/product/ProductEdit')));
const Category = Loadable(lazy(() => import('@/pages/category/Category')));
const CategoryAdd = Loadable(lazy(() => import('@/pages/category/CategoryAdd')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const MainRoutes: RouteObject = {
    path: '/',
    element: <PrivateRouter >
        <MainLayout />
    </PrivateRouter>,
    children: [
        {
            path: '',
            element: <Dashboard />
        },
        {
            path: '/product',
            element: <Product />,
        
        },
        {
            path: "/product/add",
            element: <ProductAdd />
        },
        {
            path: "/product/:productId",
            element: <ProductEdit />
        },
        {
            path: "/category/add",
            element: <CategoryAdd />
        },
        {
            path: '/category',
            element: <Category />
        },

    ]

    // ]
};

export default MainRoutes;
