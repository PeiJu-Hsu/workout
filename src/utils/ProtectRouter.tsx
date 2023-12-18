import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/UserStore';
interface PublicRoute {
    children: ReactNode;
}
interface ProtectRoute {
    children: ReactNode;
    redirectPath?: string;
}
export const PublicRoute = ({ children }: PublicRoute) => {
    const isLogin = useUserStore((state) => state.isLogin);
    // 登入情況下，如果輸入了 /login，會跳轉回首頁
    if (isLogin) return <Navigate to="/" replace />;
    return children;
};
export const ProtectedRoute = ({
    children,
    redirectPath = '/login',
}: ProtectRoute) => {
    const isLogin = useUserStore((state) => state.isLogin);
    // 未登入情況下，會跳轉回 /login 頁面
    if (!isLogin) return <Navigate to={redirectPath} replace />;

    return children;
};
