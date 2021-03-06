import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { validateToken } from "../services/userSession";
import { getUserInfo } from "../services/userSession/getUserInfo";
import { AuthContextData } from "../types/authTypes";
import { Usuario } from "../types/usuario";

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: any) {
  const history = useHistory()
  const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeAuthFlow, setActiveAuthFlow] = useState<"Implicit" | "Authorization" | null>(null)
  const [bearer, setBearer] = useState('')
  const [usuario, setUsuario] = useState<Usuario>()
  
  
  function userLoggedOnSGA() {
    const isUserCredentialsOnUrl = history.location.search.includes("---")
        return Boolean(isUserCredentialsOnUrl) 
  }

  async function refreshLoginOnIdentity(credentialsEncoded: string, targetPage: string) {
    const passwordAndMatricula = credentialsEncoded.replace('?', '').split('---')
    const password = atob(passwordAndMatricula[0])
    const matricula = atob(passwordAndMatricula[1])

    await validateToken({ password, matricula })
      .then(async result => {
        if (result.statusCode === 200) {
          setIsAuthenticated(true)
          setBearer(result.body.access_token)
          window.localStorage.setItem("Bearer", result.body.access_token)

          await getUserInfo({ bearer: result.body.access_token })
            .then(userInfo => {
              const { name, matricula8Digitos, codigoOrgaoExercicio, unidade, cargo } = userInfo.body

               if (name && matricula8Digitos && codigoOrgaoExercicio && unidade) {

              setUsuario({
                matricula: matricula8Digitos,
                nome: name,
                orgaoExercicio: codigoOrgaoExercicio,
                unidade: unidade,
                nomeCargoEfetivo: cargo
              })
              }
            })
        }
      })
      .catch(e => setActiveAuthFlow("Authorization"))
      .finally(() => {
        setIsCheckingAuthentication(false)
        history.push(targetPage)
      })    
  }
  
  useEffect(() => {
    const targetPage = history.location.pathname
    if (userLoggedOnSGA()) {
      setActiveAuthFlow("Implicit")
      const userCredentials = history.location.search
      history.push("/redirect")
      refreshLoginOnIdentity(userCredentials, targetPage)
    }
    else {
      setIsCheckingAuthentication(false)
      setActiveAuthFlow("Authorization")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setIsCheckingAuthentication,
        isAuthenticated,
        isCheckingAuthentication,
        bearer,
        setIsAuthenticated,
        activeAuthFlow,
        setBearer,
        usuario,
        setUsuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
