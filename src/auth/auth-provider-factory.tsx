import React from 'react'
import { AuthenticationProvider, oidcLog } from '@axa-fr/react-oidc-context'
import { InMemoryWebStorage } from 'oidc-client'
import { oidcClientConfig } from './oidc-client-config'
import { UsuarioContextProvider } from '../context/usuario-context-factory'

export const IdentityAuthProvider: React.FC = ({ children }) => {
  return (
    <AuthenticationProvider
      configuration={oidcClientConfig}
      isEnabled
      loggerLevel={oidcLog.NONE}
      notAuthenticated={() => <p>Você não está autenticado</p>}
      notAuthorized={() => <p>Você não está autorizado a ver esta página</p>}
      authenticating={() => (
        <p>Você será redirecionado para a página de autenticação</p>
      )}
      sessionLostComponent={() => (
        <p>Sua sessão expirou. Por favor refaça a autenticação</p>
      )}
      callbackComponentOverride={() => (
        <p>Aguarde enquanto você é redirecionado para a aplicação</p>
      )}
      UserStore={InMemoryWebStorage}
    >
      <UsuarioContextProvider>{children}</UsuarioContextProvider>
    </AuthenticationProvider>
  )
}
