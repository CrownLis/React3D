import axios from "axios";

const yandexApi = axios.create({
    baseURL: 'https://cloud-api.yandex.net/v1/',
    headers: {
        common: {
            Authorization:  `OAuth ${localStorage.getItem('access_token')}`
        }
    }
})

export const getFolderResources = async (path) => {
    return await yandexApi.get(`/disk/resources/`, {params: {
        path: path
    }})
}

export const getDownloadLink = async (fileName) => {
    return await yandexApi.get(`/disk/resources/download`, {params: {
        path: `models/${fileName}`
    }})
}