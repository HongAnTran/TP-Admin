import { lazy } from 'react';
import { RouteObject } from "react-router-dom"

// project imports
import Loadable from '../ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
import PrivateRouter from '@/utils/PrivateRouter';
// login option 3 routing
const Product = Loadable(lazy(() => import('@/pages/product/Product')));
const Dashboard = Loadable(lazy(() => import('@/pages/dashboard/Dashboard')));
const ProductAdd = Loadable(lazy(() => import('@/pages/product/ProductAdd')));
const ProductEdit = Loadable(lazy(() => import('@/pages/product/ProductEdit')));
const Category = Loadable(lazy(() => import('@/pages/category/Category')));
const CategoryAdd = Loadable(lazy(() => import('@/pages/category/CategoryAdd')));
const CategoryEdit = Loadable(lazy(() => import('@/pages/category/CategoryEdit')));

const CategoryBlog = Loadable(lazy(() => import('@/pages/category-blog/Category')));
const CategoryBlogAdd = Loadable(lazy(() => import('@/pages/category-blog/CategoryAdd')));


const Blog = Loadable(lazy(() => import('@/pages/blog/Blog')));
const BlogAdd = Loadable(lazy(() => import('@/pages/blog/BlogAdd')));

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
            path: "/category/:id",
            element: <CategoryEdit />
        },
        {
            path: '/category',
            element: <Category />
        },
        {
            path: '/category-blog',
            element: <CategoryBlog />
        },
        {
            path: '/category-blog/add',
            element: <CategoryBlogAdd />
        },

        {
            path: '/blog',
            element: <Blog />
        },
        {
            path: '/blog/add',
            element: <BlogAdd />
        },

    ]

    // ]
};

export default MainRoutes;
