import React from "react";
import { Outlet, Navigate } from "react-router-dom";
function useAuth() {
  const user = localStorage.getItem("token")
  if(user){
      return true;
  }
  else{
      return false;
  }

}

function Privateroute() {
  const token = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default Privateroute;
