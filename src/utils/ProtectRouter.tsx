import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/UserStore";

export const PublicRoute = ({ children }: any) => {
  const isLogin = useUserStore((state) => state.isLogin);
  // 登入情況下，如果輸入了 /login，會跳轉回首頁
  if (isLogin) return <Navigate to="/" replace />;
  return children;
};
export const ProtectedRoute = ({ children, redirectPath = "/login" }: any) => {
  const isLogin = useUserStore((state) => state.isLogin);
  // 未登入情況下，會跳轉回 /login 頁面
  if (!isLogin) return <Navigate to={redirectPath} replace />;
  return children;
};
