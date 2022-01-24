import { HttpClient } from "../http/httpClient";

type props = {
    bearer: string
}

export async function getUserInfo({bearer}: props){
    const httpClient = new HttpClient();

    const httpResponse = await httpClient.request({
        url: "https://accountshomol.pcdf.gov.br/connect/userinfo",
        method: "post",
        headers: {
            "Authorization": 'Bearer ' + bearer
        }
    })

    return httpResponse;
}