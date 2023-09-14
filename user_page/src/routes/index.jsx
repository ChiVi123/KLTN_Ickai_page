import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '~/hocs';
import { DefaultLayout } from '~/layouts';
import {
    Cart,
    Home,
    Login,
    NotifyOrder,
    Order,
    OrderHistory,
    PageNotFound,
    Product,
    Profile,
    Search,
    SendOtp,
    SignUp,
    Verify,
    VerifyRegister,
} from '~/pages';
import * as paths from './paths';

export const router = createBrowserRouter([
    // Pubic
    {
        path: paths.root,
        element: <PublicRoutes />,
        errorElement: (
            <DefaultLayout>
                <PageNotFound />
            </DefaultLayout>
        ),
        children: [
            {
                index: true,
                element: (
                    <DefaultLayout>
                        <Home />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.product,
                element: (
                    <DefaultLayout>
                        <Product />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.search,
                element: (
                    <DefaultLayout>
                        <Search />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.login,
                element: (
                    <DefaultLayout>
                        <Login />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.signUp,
                element: (
                    <DefaultLayout>
                        <SignUp />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.sendOTP,
                element: (
                    <DefaultLayout>
                        <SendOtp />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.verify,
                element: (
                    <DefaultLayout>
                        <Verify />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.verifyRegister,
                element: (
                    <DefaultLayout>
                        <VerifyRegister />
                    </DefaultLayout>
                ),
            },
        ],
    },

    // Private
    {
        path: paths.root,
        element: <PrivateRoutes />,
        errorElement: (
            <DefaultLayout>
                <PageNotFound />
            </DefaultLayout>
        ),
        children: [
            {
                path: paths.profile,
                element: (
                    <DefaultLayout>
                        <Profile />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.cart,
                element: (
                    <DefaultLayout>
                        <Cart />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.notifyOrder,
                element: (
                    <DefaultLayout>
                        <NotifyOrder />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.order,
                element: (
                    <DefaultLayout>
                        <Order />
                    </DefaultLayout>
                ),
            },
            {
                path: paths.orderHistory,
                element: (
                    <DefaultLayout>
                        <OrderHistory />
                    </DefaultLayout>
                ),
            },
        ],
    },
]);
