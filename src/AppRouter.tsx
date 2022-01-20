import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Servidores from "./Servidores";

export default function AppRouter() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    useEffect(() => {
        //const sessionID = localStorage.getItem("PHPSESSID")
        //sessionID ? setIsAuthenticated(true) : setIsAuthenticated(false)
        
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <p>carregando</p>               
        )
    }
    else {
        return (
            <BrowserRouter>
                <Routes>
                    {
                        !isAuthenticated ? (
                            <Route
                                path="*"
                                element={<Login />}
                            />
                        ) 
                            :

                        <Route
                            path="/sga-react/servidores/:codUnidade"
                            element={<Servidores />}
                        />
                    }
                </Routes>
            </BrowserRouter>
        )
    }
}