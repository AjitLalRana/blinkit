import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const user = useSelector((state) => state?.userReducer?.user);
  console.log(user)

  //  Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  //  Not admin
  if (user?.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  // Admin access allowed
  return <Outlet />;
};

export default AdminRoute;