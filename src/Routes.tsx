import React, { useContext} from "react";
import Servidores from "./Servidores";
import {
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
            return <p>aifhj</p>
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
                    path="/sga-react/servidores/:codUnidade"
                    component={Servidores}
                />

                <CustomRoute
                    path="/redirect"
                    component={WaitingPage}
                />
            </Switch>
        )
    }
}