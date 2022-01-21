import React, { useContext} from "react";
import Servidores from "./Servidores";
import {
  Route,
  RouteComponentProps,
  Switch,
  useHistory
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { validateToken } from "./services/userSession";

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
    // const history = useHistory()

    // function userLoggedOnSGA() {
    //     const isUserCredentialsOnUrl = history.location.search
    //     return isUserCredentialsOnUrl 
    // }

    // async function refreshLoginOnIdentity(credentialsEncoded: string) {
    //     const passwordAndMatricula = credentialsEncoded.replace('?', '').split('---')
    //     const password = atob(passwordAndMatricula[0])
    //     const matricula = atob(passwordAndMatricula[1])

    //     var loginResult = await validateToken({ password, matricula })
        
    //     loginResult.statusCode === 200 ? 
         
    // }

    const CustomRoute = ({ isPrivate, ...rest }: CustomRouteProps) => {
        if (isPrivate && !isAuthenticated) {
            return <p>aifhj</p>
        } else {
        return <Route {...rest} />;
        }
    };


    if (isCheckingAuthentication) {
        return (
            <p>Carregando...</p>
        )
    } else {
        return (            
            <Switch>
                <CustomRoute
                    isPrivate
                    path="/sga-react/servidores/:codUnidade"
                    component={Servidores}
                />
            </Switch>
        )
    }
}