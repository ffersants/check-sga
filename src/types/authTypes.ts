import { HttpResponse } from "../services/http/IHttpClient";

export type SignInCredentials = {
  matricula: string;
  password: string;
};

export type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<HttpResponse>;
  signOut(): void;
  bearer: string;
  isAuthenticated: boolean;
  isCheckingAuthentication: boolean;
};
