import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { login, validateToken } from "../services/userSession";
import { AuthContextData,  SignInCredentials } from "../types/authTypes";

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: any) {
  const history = useHistory()
  const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bearer, setBearer] = useState('')
  
  function userLoggedOnSGA() {
        const isUserCredentialsOnUrl = history.location.search
        return isUserCredentialsOnUrl 
    }

  async function refreshLoginOnIdentity(credentialsEncoded: string) {
        const passwordAndMatricula = credentialsEncoded.replace('?', '').split('---')
        const password = atob(passwordAndMatricula[0])
        const matricula = atob(passwordAndMatricula[1])

    await validateToken({ password, matricula })
      .then(result => {
        if (result.statusCode === 200) {
          setIsAuthenticated(true)
          setBearer(result.body.access_token)
      }
      })
    .finally(() => setIsCheckingAuthentication(false))
    }
  useEffect(() => {
    if (userLoggedOnSGA()) {
        const userCredentials = history.location.search
        refreshLoginOnIdentity(userCredentials)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        bearer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
