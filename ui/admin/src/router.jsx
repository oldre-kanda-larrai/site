import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from './layouts/public';

import ErrorPage from './pages/public/error';
import HomePublicPage from './pages/public/home';
import LoginPage from './pages/public/login';
import SignUpPage from './pages/public/signup';

import StoreLayout from './layouts/store';
import HomeStorePage from './pages/store/home';

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <PublicLayout />,

        children: [
            { path: '/', element: <HomePublicPage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignUpPage /> }
        ]
    },

    {
        path: "/store/:storeLink",
        errorElement: <ErrorPage />,
        element: <StoreLayout />,

        children: [
            { path: '', element: <HomeStorePage /> }
        ]
    }
]);

export default router;