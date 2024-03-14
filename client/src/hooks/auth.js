import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const token = document.cookie;
  const token = Cookies.get("token");

  useEffect(() => {
    setIsLoggedIn(!token);
  }, [token]);

  const logout = () => {
    // Clear the authentication token
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, logout };
};

export default useAuth;
