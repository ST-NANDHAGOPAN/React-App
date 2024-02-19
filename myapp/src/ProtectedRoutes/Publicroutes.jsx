import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

function Publicroutes() {
  const token = useAuth();
  return token ?  <Navigate to="/" /> : <Outlet /> ;
}

export default Publicroutes;
