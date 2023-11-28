import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/UserStore";
interface PublicRoute {
  children: ReactNode;
}
interface ProtectRoute {
  children: ReactNode;
  redirectPath?: string;
}
export const PublicRoute = ({ children }: PublicRoute) => {
  const signUpRole = useUserStore((state) => state.signUpRole);
  const isLogin = useUserStore((state) => state.isLogin);
  // 登入情況下，如果使用者資料庫內role = 0 ，會跳轉profile頁面(Google登入會有的狀況)
  if (isLogin && signUpRole === 0) return <Navigate to="/profile" replace />;
  // 登入情況下，如果輸入了 /login，會跳轉回首頁
  if (isLogin) return <Navigate to="/" replace />;
  return children;
};
export const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: ProtectRoute) => {
  const isLogin = useUserStore((state) => state.isLogin);
  // 未登入情況下，會跳轉回 /login 頁面
  if (!isLogin) return <Navigate to={redirectPath} replace />;

  return children;
};
