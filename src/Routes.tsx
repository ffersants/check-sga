import React, { useContext} from "react";
import Servidores from "./Servidores";
import {
    Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import WaitingPage from "./WaitingPage";

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

    const CustomRoute = ({ isPrivate, ...rest }: CustomRouteProps) => {
        if (isPrivate && !isAuthenticated) {
            return <Redirect to="/google.com" />
        } else {
        return <Route {...rest} />;
        }
    };


    if (isCheckingAuthentication) {
        return (
            <WaitingPage />
        )
    } else {
        return (            
            <Switch>
                <CustomRoute
                    isPrivate
                    exact
                    path="/sga-react/servidores/:codUnidade"
                    component={Servidores}
                />

                <CustomRoute
                    exact
                    path="/fasf"
                    component={WaitingPage}
                />
            </Switch>
        )
    }
}