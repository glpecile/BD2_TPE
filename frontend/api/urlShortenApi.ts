import {api} from "./api";

export interface CreateShortUrl {
    url: string;
    alias: string;
}

export interface ShortUrl {
    url: string;
    alias: string;
    clicks: number,
    date: string,
    owner?: number,
}

interface QueryParams {
    userId: number,
    sort: string,
    order: string
}

export const urlShortenApi = (() => {

    const createUrl = async ({url, alias}: CreateShortUrl) => {
        return await api.post(`/urls`, {
            alias,
            url,
        });
    }

    const deleteUrl = async ({alias}: ShortUrl) => {
        return await api.delete(`/urls/${alias}`);
    }

    const getUrl = async ({alias}: ShortUrl) => {
        return await api.get(`/urls/${alias}`);
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