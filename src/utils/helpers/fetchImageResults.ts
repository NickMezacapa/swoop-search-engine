import axios, { AxiosResponse } from 'axios';

const BASE_SEARCH_API_URL = process.env.BASE_SEARCH_API_URL!;

export const fetchImageResults = async (query: string): Promise<any> => {
    try {
        const response: AxiosResponse<string> = await axios.get<string>(BASE_SEARCH_API_URL, {
            params: {
                q: query,
                category_images: 'on',
                language: 'auto',
                safesearch: 0,
                format: 'json',
            }
        });
        const searchResultData = response.data;
        return searchResultData;
    } catch (error) {
        console.log('🅱️ ERROR FETCHING RESULTS!', error);
    }
};
