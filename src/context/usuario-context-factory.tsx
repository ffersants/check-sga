import React, { useContext, useEffect, useState } from 'react'
import { Usuario } from '../types/usuario'
import { useReactOidc } from '@axa-fr/react-oidc-context'
import { UsuarioContext } from './usuario-context'
import { AuthContext } from './authContext'

export const UsuarioContextProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState('')

  const { isEnabled, login, logout, oidcUser } = useReactOidc()

  const {setIsCheckingAuthentication, setIsAuthenticated, activeAuthFlow, setBearer, usuario, setUsuario} = useContext(AuthContext)

  // Axios global interceptor magic
  // Axios.interceptors.request.use(
  //   (config) => {
  //     if (oidcUser) {
  //       config.headers = {
  //         ...config.headers,
  //         Authorization: `Bearer ${oidcUser.access_token}`
  //       }
  //     }
  //     return config
  //   },
  //   (error) => console.log('error ', error)
  // )

  useEffect(() => {
    if (activeAuthFlow === "Authorization") {
      if (!isEnabled || !oidcUser) {
        setUsuario(undefined)
        setAccessToken('')
        return
      }

      const { name, matricula8Digitos, codigoOrgaoExercicio, unidade, cargo } = oidcUser.profile

      if (oidcUser.access_token) {
        setAccessToken(oidcUser.access_token)
        console.log('bearer recebido pelo identity', oidcUser.access_token)
        setBearer(oidcUser.access_token)
        setIsAuthenticated(true)
        setIsCheckingAuthentication(false)
      }
      if (name && matricula8Digitos && codigoOrgaoExercicio && unidade) {

        setUsuario({
          matricula: matricula8Digitos,
          nome: name,
          orgaoExercicio: codigoOrgaoExercicio,
          unidade: unidade,
          nomeCargoEfetivo: cargo
        })
      }
    }
  }, [isEnabled, oidcUser])

  return (
    <UsuarioContext.Provider
      value={{
        getUsuario: () => usuario,
        accessToken,
        login,
        logout
      }}
    >
      {children}
    </UsuarioContext.Provider>
  )
}

export const withUsuarioContext = (Component: React.FC) => {
  return (
    <UsuarioContextProvider>
      <Component />
    </UsuarioContextProvider>
  )
}
