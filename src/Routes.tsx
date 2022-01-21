import React, { useContext} from "react";
import Servidores from "./Servidores";
import {
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

    // if (isCheckingAuthentication) {
    //     return (
    //         <WaitingPage />
    //     )
    // }
    console.log(isAuthenticated)
    if (!isAuthenticated) {
        console.log('foi no nao autenticado', isAuthenticated)
        return (
            <IdentityAuthProvider>
                <Route
                    exact
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
        console.log('veio no autenticado')
        return (
            <Switch>
                <Route
                    exact
                    path="/sga-react/servidores/:codUnidade"
                    component={Servidores}
                />
            </Switch>
        )
    }
}