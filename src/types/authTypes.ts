import { Usuario } from "./usuario";

export type SignInCredentials = {
  matricula: string;
  password: string;
};

export type AuthContextData = {
  bearer: string;
  setBearer: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  isCheckingAuthentication: boolean;
  setIsCheckingAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  activeAuthFlow: "Implicit" | "Authorization" | null
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | undefined>>
  usuario: Usuario | undefined
};
