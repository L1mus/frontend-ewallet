import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { isLogin, loginUser } = useSelector((state) => state.authReducer());
  if (isLogin && loginUser?.has_pin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
