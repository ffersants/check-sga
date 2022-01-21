import { HttpClient } from "../http/httpClient";

type props = {
    codUnidade: string;
    bearer: string
}

export async function getServidores({codUnidade, bearer}: props){
    const httpClient = new HttpClient();
    console.log('recebi o bearer', bearer.length)
    const httpResponse = await httpClient.request({
        url: "https://localhost:5001/servidores-da-unidade/" + codUnidade,
        method: "get",
        headers: {
            Authorization: "Bearer "+ bearer
        }
    })

    return httpResponse;
}