import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  console.log("private entry")
  const { isAuthenticated, isLoadingAuth } = useContext(AuthContext);
  console.log("private crossed auth import");


  useEffect(()=>{ console.log("entered private useEffect", isAuthenticated)},[])
  
  if (isLoadingAuth){
    console.log("came for loading..   ")
    return <div className="text-center mt-10">Loading...</div>;
  } 
  else{
    console.log("else of pr ran.. with isAuthenticated ", isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
  
};
