import axios, { AxiosResponse } from 'axios';
import { type SearchResult, type SearchData } from '@utils/types';

type SwoopApiResponse = AxiosResponse<SearchData>;

export class SwoopClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async search(query: string, safeSearchValue: number): Promise<SearchResult[]> {
        const response: SwoopApiResponse = await axios.get<SearchData>(`${this.baseUrl}/search`, {
            params: {
                q: query,
                language: 'en',
                safesearch: safeSearchValue,
                format: 'json'
            },
        });
        return response.data.results;
    }
}
