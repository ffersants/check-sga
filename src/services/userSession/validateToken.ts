import { HttpClient } from "../http/httpClient";

type props = {
    matricula: string,
    password: string
}

export async function validateToken({matricula, password}: props){
    const httpClient = new HttpClient();

    const httpResponse = await httpClient.request({
        url: "https://accountshomol.pcdf.gov.br/connect/token",
        method: "post",
        body: {
            grant_type: "password",
            username: matricula,
            password,
            scope: "openid profile sga_api offline_access procedimento_api corporativo_api protocolo_api servicoproced_api",
            client_Id: "CARTORIO",
            client_Secret: "OMFCAFSX"
        }
    })

    return httpResponse;
}