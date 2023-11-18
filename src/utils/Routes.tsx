import { Navigate } from "react-router-dom";

import { ProtectedRoute, PublicRoute } from "./ProtectRouter";
// import ProtectedRoute from './ProtectedRoute'

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";

export const Routes = [
  {
    path: "/",
    // 將所有需要保護的路由，用 <ProtectedRoute> 包起來
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
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
    path: "/login",
    name: "login",
    // 不需要保護的路由，用 <PublicRoute> 包起來
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    // 未匹配的網址一律導回首頁
    element: <Navigate to="/" replace />,
  },
];
