import { request } from "http";
import { SignInCredentials } from "../../types/authTypes";
import { HttpClient } from '../http/httpClient';


export async function login({matricula, password}: SignInCredentials){
    const httpClient = new HttpClient();

    const httpResponse = await httpClient.request({
        url: "/login",
        method: "post",
        body: {
            matricula,
            password
        }
    })
    return httpResponse;
}

 