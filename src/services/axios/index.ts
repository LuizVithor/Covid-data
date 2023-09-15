/* eslint-disable no-async-promise-executor */
import axios, { AxiosRequestConfig, ResponseType } from "axios";

// Criar de criação de padrão para requisições

const API_URL = "https://covid19-brazil-api.now.sh/api/report/v1/";

const api = axios.create({
    baseURL: API_URL
})

export function destroy(path: string, responseType: ResponseType = "json") {

    const _defaults = {...defaults, headers: {...defaults.headers}}
    if(responseType) _defaults.responseType = responseType;
    return new Promise(async (resolve) => {
        await api
            .delete(path, _defaults)
                .then((response: unknown) => {
                    resolve(response);
                })
                .catch((error: unknown) => resolve(error))
    })

}

export async function get(path: string, responseType: ResponseType = "json") {

    const _defaults = {...defaults, headers: {...defaults.headers}}
    if(responseType) _defaults.responseType = responseType;
    return new Promise(async (resolve) => {
        await api
            .get(path, _defaults)
                .then((response: unknown) => {
                    resolve(response);
                })
                .catch((error: unknown) => resolve(error))
    })

}

export function put(path: string, data: object, responseType: ResponseType = "json") {
    const _defaults = {...defaults, headers: {...defaults.headers}}
    if(responseType) _defaults.responseType = responseType;
    return new Promise(async (resolve) => {
        await api
            .put(path, data, _defaults)
                .then((response: unknown) => {
                    resolve(response);
                })
                .catch((error: unknown) => resolve(error))
    })
}

export function post(path: string, data: object, content_type?: string, responseType: ResponseType = "json") {
    const _defaults: AxiosRequestConfig = {...defaults, headers: {...defaults.headers}}
    if(responseType) _defaults.responseType = responseType;
    if(content_type) _defaults.headers!["Content-Type"] = content_type
    return new Promise(async (resolve) => {
        await api
            .post(path, data, _defaults)
                .then((response: unknown) => {
                    resolve(response);
                })
                .catch((error: unknown) => resolve(error))
    })
}

export const defaults: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json"
    },
    responseType: "json"
}