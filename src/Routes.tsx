import React, { useContext} from "react";
import Servidores from "./Servidores";
import {
    BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import WaitingPage from "./WaitingPage";
import { OidcSecure } from '@axa-fr/react-oidc-context'
import { IdentityAuthProvider } from "./auth/auth-provider-factory";

type CustomRouteProps = {
  isPrivate?: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | undefined;
  path: string;
  exact?: boolean;
};

export default function Routes() {
    const { isAuthenticated, isCheckingAuthentication } = useContext(AuthContext);

    if (isCheckingAuthentication) {
        return (
            <WaitingPage />
        )
    }
    if (!isAuthenticated) {
        return (
            <IdentityAuthProvider>
                <Route
                    path="/sga-react/servidores/:codUnidade"
                >
                    <OidcSecure>
                        <Servidores />
                    </OidcSecure>
                </Route>
            </IdentityAuthProvider>
        )
    }
    else {
        return (
            <Switch>
                <Route
                    path="/sga-react/servidores/:codUnidade"
                    component={Servidores}
                />
            </Switch>
        )
    }
}