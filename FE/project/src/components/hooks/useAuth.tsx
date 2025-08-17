import { useContext } from "react";

import AuthContext, { AuthContextType } from "@context/AuthContext";

const useAuth = (): AuthContextType => {
  const {
    isAuth,
    isLoading,
    setAuth,
    setCurrentToken,
    setCurrentUID,
    currentToken,
    currentUID,
    currentTokenRef,
    currentUIDRef,
    logout
  } = useContext(AuthContext);

  return {
    isAuth,
    isLoading,
    setAuth,
    setCurrentToken,
    setCurrentUID,
    currentToken,
    currentUID,
    currentTokenRef,
    currentUIDRef,
    logout
  };
};

export default useAuth;
