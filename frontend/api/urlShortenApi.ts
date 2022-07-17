import {api} from "./api";

export interface ShortUrl {
    url: string;
    key: string;
}

interface QueryParams {
    userId: string,
    sort: string,
    order: string
}

export const urlShortenApi = (() => {

    const createUrl = async ({url, key}: ShortUrl) => {
        return await api.post(`/urls`, {
            'key': key,
            'url': url,
        });
    }

    const deleteUrl = async ({key}: ShortUrl) => {
        return await api.delete(`/urls/${key}`);
    }

    const getUrl = async ({key}: ShortUrl) => {
        return await api.get(`/urls/${key}`);
    }

    const getUrlsByUser = async ({userId, sort, order}: QueryParams) => {
        return await api.get(`/urls`, {
            params: {
                owner: userId,
                sort: sort,
                order: order
            }
        });
    }

    return {createUrl, deleteUrl, getUrl, getUrlsByUser};
})();