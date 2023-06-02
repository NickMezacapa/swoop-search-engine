import axios, { AxiosResponse } from 'axios';

const BASE_SEARCH_API_URL = process.env.BASE_SEARCH_API_URL!;

interface SearchParams {
    [key: string]: string | number;
}

export const fetchSearchResults = async (query: string, safeSearchValue?: number, pageno?: number, forImages?: boolean): Promise<any> => {
    try {
        const params: SearchParams = {
            q: query,
            format: 'json',
            pageno: pageno ?? 1,
            safesearch: safeSearchValue ?? 0,
        };

        if (forImages)
            params.category_images = 'on'

        const response: AxiosResponse<string> = await axios.get<string>(BASE_SEARCH_API_URL, { params });
        const searchResultData = response.data;
        return searchResultData;
    } catch (error) {
        console.log('🅱️ ERROR FETCHING RESULTS!', error);
        return null;
    }
};
