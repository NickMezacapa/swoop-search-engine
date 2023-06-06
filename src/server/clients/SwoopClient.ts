import axios, { AxiosResponse } from 'axios';
import type { SearchResult, SearchData } from '@utils/types';

type SwoopApiResponse = AxiosResponse<SearchData>;

export enum SearchCategory {
    All = 'general',
    Images = 'images',
    Videos = 'videos',
    News = 'news',
    Maps = 'maps'
}

export interface SearchConfig {
    query: string;
    safeSearchValue: number;
    category?: SearchCategory;
}

const BASE_API_URL = process.env.BASE_SEARCH_API_URL;

export class SwoopClient {
    private async fetchResults(config: SearchConfig): Promise<SearchResult[]> {
        const { query, safeSearchValue, category } = config;
        const params: Record<string, any> = {
            q: query,
            language: 'en',
            safesearch: safeSearchValue ?? 0,
            format: 'json',
        };
        if (category) params[`category_${category}`] = 'on';

        const response: SwoopApiResponse = await axios.get<SearchData>(
            `${BASE_API_URL}`, { params }
        );

        return response.data.results;
    }

    // All search results
    async search(config: SearchConfig): Promise<SearchResult[]> {
        const results = await this.fetchResults(config);
        return results;
    }

    // Query results by category type ('images', 'videos' ...)
    async searchByCategory(config: SearchConfig): Promise<SearchResult[]> {
        const { category } = config;
        if (!category) {
            throw new Error('🅱️Category is required for searchByCategory🅱️');
        }

        const results = await this.fetchResults(config);
        const categoryResults = results.filter(result => result.category === category);
        return categoryResults;
    }
}
