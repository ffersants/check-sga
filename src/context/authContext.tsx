import { createContext, useEffect, useState } from "react";

import { login, validateToken } from "../services/userSession";
import { AuthContextData,  SignInCredentials } from "../types/authTypes";

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: any) {
 
  const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    validateToken({matricula: '00229', password: '65'})
      .then((validationResult) => {
        if (validationResult.statusCode === 200) {
          setIsAuthenticated(true);
        }
        setIsCheckingAuthentication(false);
      })
      .catch((i) => {
        setIsAuthenticated(false);
      });
  }, []);

  async function signIn({ matricula, password }: SignInCredentials) {
    const result = await login({ matricula, password });

    if (result.body.authorized === true) {
      const {
        accessToken,
      } = result.body;
      
      setIsAuthenticated(true);
      localStorage.setItem("jwt", accessToken);
    }

    return result;
  }

  function signOut() {
    localStorage.clear();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        isCheckingAuthentication,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
