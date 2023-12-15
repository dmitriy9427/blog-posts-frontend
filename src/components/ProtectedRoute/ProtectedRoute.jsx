import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ status }) => {
  if (!status) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
