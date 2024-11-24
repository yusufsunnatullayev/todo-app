import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const loggedIn = useSelector((state) => state.status.loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
