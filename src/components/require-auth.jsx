import { Navigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { Outlet } from "react-router-dom";
import LoadingComponent from "./loading-component";

function RequireAuth() {
  const {
    auth: { isAuthenticated },
    loading,
  } = useAuth();

  if (loading) return <LoadingComponent />;

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return <Outlet />;
}

export default RequireAuth;
