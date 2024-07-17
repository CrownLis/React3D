import axios from "axios";

const yandexApi = axios.create({
    baseURL: 'https://cloud-api.yandex.net/v1/',
    headers: {
        common: {
            Authorization:  `OAuth ${localStorage.getItem('access_token')}`
        }
    }
})

export const getModelsList = async () => {
    return await yandexApi.get(`/disk/resources/`, {params: {
        path: 'models'
    }})
}

export const getDownloadLink = async (fileName) => {
    return await yandexApi.get(`/disk/resources/download`, {params: {
        path: `models/${fileName}`
    }})
}