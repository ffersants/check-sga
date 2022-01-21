import { HttpResponse } from "../services/http/IHttpClient";

export type SignInCredentials = {
  matricula: string;
  password: string;
};

export type AuthContextData = {
  bearer: string;
  isAuthenticated: boolean;
  isCheckingAuthentication: boolean;
  setIsCheckingAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
