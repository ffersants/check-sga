import { createContext } from 'react'
import { Usuario } from '../types/usuario'

interface UsuarioContextType {
  getUsuario: () => Usuario | undefined
  accessToken?: string
  login: Function
  logout: Function
}

export const UsuarioContext = createContext<UsuarioContextType>({
  getUsuario: () => undefined,
  accessToken: undefined,
  login: () => undefined,
  logout: () => undefined
})
