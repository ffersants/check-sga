import React, { useContext} from "react";
import Servidores from "./Servidores";
import {
    BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import WaitingPage from "./WaitingPage";
import { OidcSecure } from '@axa-fr/react-oidc-context'
import { IdentityAuthProvider } from "./auth/auth-provider-factory";

export default function Routes() {
    const { activeAuthFlow} = useContext(AuthContext);

   if (activeAuthFlow === "Authorization") {
        console.log('2')
        return (
            <IdentityAuthProvider>
                <BrowserRouter>
                <Switch>
                <Route
                    exact
                    path="/sga-react/servidores/:codUnidade"
                    >
                    <OidcSecure>
                        <Servidores />
                    </OidcSecure>
                </Route>
                </Switch>
                </BrowserRouter>
            </IdentityAuthProvider>
        )
    }
    else if(activeAuthFlow === "Implicit") {
        console.log('3')
        return (
            <Switch>
                <Route
                    exact
                    path="/sga-react/servidores/:codUnidade"
                    component={Servidores}
                />
                <Route
                    exact
                    path="/redirect"
                    component={WaitingPage}
                />
            </Switch>
        )
    }
   else {
       return (
           <p>Loading...</p>
       )
    }
}