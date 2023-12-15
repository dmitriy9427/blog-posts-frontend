import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ status }) => {
  if (!window.localStorage.getItem("token") && !status) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
