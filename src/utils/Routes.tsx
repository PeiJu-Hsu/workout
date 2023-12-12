import { Navigate, Outlet } from 'react-router-dom';

import { ProtectedRoute, PublicRoute } from '../utils/ProtectRouter.jsx';
// import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/Home';
import InBody from '../pages/InBody';
import LogIn from '../pages/LogIn/index';
import Profile from '../pages/Profile';
import Record from '../pages/Record';
import SignUp from '../pages/SignUp';
import Training from '../pages/Training';
export const Routes = [
    {
        path: '/',
        // 將所有需要保護的路由，用 <ProtectedRoute> 包起來
        element: (
            <ProtectedRoute>
                <div className=" myPageContainer">
                    <div className="myPageInnerPadding">
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
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'record',
                element: <Record />,
            },
        ],
    },
    //   {
    //     path: "/reservation",
    //     name: "reservation",
    //     // <Outlet /> 可以渲染子路由的元件
    //     element: (
    //       <ProtectedRoute>
    //         <Outlet />
    //       </ProtectedRoute>
    //     ),
    //     children: [
    //       {
    //         path: "",
    //         element: <ReservationPage />,
    //       },
    //       {
    //         path: "create",
    //         name: "createReservation",
    //         element: <CreateReservationPage />,
    //       },
    //       {
    //         path: "edit/:id",
    //         name: "editReservation",
    //         element: <EditReservationPage />,
    //       },
    //     ],
    //   },
    {
        path: '/login',
        name: 'login',
        // 不需要保護的路由，用 <PublicRoute> 包起來
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
    {
        path: '*',
        // 未匹配的網址一律導回首頁
        element: <Navigate to="/" replace />,
    },
];
