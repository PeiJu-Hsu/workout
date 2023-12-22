import { Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import InBody from '../pages/InBody';
import LogIn from '../pages/LogIn/';
import Record from '../pages/Record';
import SignUp from '../pages/SignUp';
import Training from '../pages/Training';
import { ProtectedRoute, PublicRoute } from '../utils/ProtectRouter.jsx';
export const Routes = [
    // 將所有需要保護的路由，用 <ProtectedRoute> 包起來
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <div className="myPageContainer">
                    <div className="overflow-x-auto h-full pr-2">
                        <Outlet />
                    </div>
                </div>
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'inbody',
                element: <InBody />,
            },
            {
                path: 'training',
                element: <Training />,
            },
            {
                path: 'record',
                element: <Record />,
            },
        ],
    },

    // 不需要保護的路由，用 <PublicRoute> 包起來
    {
        path: '/login',
        name: 'login',
        element: (
            <PublicRoute>
                <LogIn />
            </PublicRoute>
        ),
    },
    {
        path: '/signup',
        name: 'signup',
        element: (
            <PublicRoute>
                <SignUp />
            </PublicRoute>
        ),
    },

    // 未匹配的網址一律導回首頁
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
];
