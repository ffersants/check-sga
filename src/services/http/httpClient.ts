import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { HttpRequest, HttpResponse, IHttpClient } from "./IHttpClient";

export class HttpClient implements IHttpClient {
   async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: qs.stringify(data.body),
        headers: data.headers,
        params: data.params,
        timeoutErrorMessage: "Isso está tomando mais tempo do que o esperado",
      });

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (erro: any) {
      if (erro.response) {
        if (erro.response.status === 400) {
          return {
            statusCode: erro.status,
            body: {
              message:
                "Certifique-se de que todos os campos estão devidamente preenchidos",
            },
          };
        }
        if (erro.response.status === 500) {
          return {
            statusCode: erro.status,
            body: {
              message:
                "Um erro inesperado ocorreu. Favor contatar o administrador do sistema.",
            },
          };
        }
        if (erro.response.status === 401) {
          return {
            statusCode: erro.response.status,
            body: {
              message: "Usuário não autenticado",
            },
          };
        }
        return {
          statusCode: erro.response.status,
          body: erro.response.data,
        };
      } else if (erro.request) {
        console.log("client never received a response, or request never left");
        return {
          statusCode: 408,
          body: {
            message:
              "Não foi possível completar a sua requisição, favor tentar novamente. Entre em contato com a equipe técnica caso o problema persista.",
          },
        };
      } else {
        console.log("Erro desconhecido/não esperado", erro)
        return {
          statusCode: 500,
          body: {
            message:
              "Ops... Algo não está certo! Favor entrar em contato com a equipe técnica para suporte.",
          },
        };
      }
    }
  }
}
