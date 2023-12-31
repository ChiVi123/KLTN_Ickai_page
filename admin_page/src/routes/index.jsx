import { createBrowserRouter } from 'react-router-dom';
import { AdminRoutes } from '~/hoc';
import { AdminLayout } from '~/layout';
import {
    Categories,
    Dashboard,
    Login,
    Order,
    Orders,
    ProductCreate,
    ProductUpdate,
    Products,
    Reviews,
    Users,
} from '~/pages';
import * as paths from './paths';

export const router = createBrowserRouter([
    {
        path: paths.root,
        children: [
            {
                path: paths.login,
                element: <Login />,
            },
        ],
    },
    {
        path: paths.root,
        element: <AdminRoutes />,
        children: [
            {
                index: true,
                element: (
                    <AdminLayout>
                        <Dashboard />
                    </AdminLayout>
                ),
            },
            {
                path: paths.products,
                element: (
                    <AdminLayout>
                        <Products />
                    </AdminLayout>
                ),
            },
            {
                path: paths.productAdd,
                element: (
                    <AdminLayout>
                        <ProductCreate />
                    </AdminLayout>
                ),
            },
            {
                path: paths.productEdit,
                element: (
                    <AdminLayout>
                        <ProductUpdate />
                    </AdminLayout>
                ),
            },
            {
                path: paths.categories,
                element: (
                    <AdminLayout>
                        <Categories />
                    </AdminLayout>
                ),
            },
            {
                path: paths.orders,
                element: (
                    <AdminLayout>
                        <Orders />
                    </AdminLayout>
                ),
            },
            {
                path: paths.order,
                element: (
                    <AdminLayout>
                        <Order />
                    </AdminLayout>
                ),
            },
            {
                path: paths.users,
                element: (
                    <AdminLayout>
                        <Users />
                    </AdminLayout>
                ),
            },
            {
                path: paths.reviews,
                element: (
                    <AdminLayout>
                        <Reviews />
                    </AdminLayout>
                ),
            },
        ],
    },
]);
