import { SwoopClient, ClientCommunicator, SearchCategory, SearchConfig } from '../src/server/clients/SwoopClient';
import type { SearchResult } from '../src/utils/types';
import type { SearchData } from '../src/utils/types';
import axios from 'axios';

// SwoopClient Mock
// Here is the original SwoopClient class:
/* 
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

export interface ClientCommunicator {
    search(config: SearchConfig): Promise<SearchResult[]>;
    searchByCategory(config: SearchConfig): Promise<SearchResult[]>;
}

const BASE_API_URL = process.env.BASE_SEARCH_API_URL;

export class SwoopClient implements ClientCommunicator {
    sessionStorage: Storage | undefined;
    constructor() {
        if (!BASE_API_URL) {
            throw new Error('A valid URL is required for SwoopClient.');
        }
        if (typeof window !== 'undefined') {
            this.sessionStorage = window.sessionStorage;
        }
    }

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

    private getResultsFromSessionStorage(query: string): SearchResult[] | null {
        if (!this.sessionStorage) return null;
        const results = this.sessionStorage.getItem(query);
        if (!results) return null;
        return JSON.parse(results);
    }

    private setResultsToSessionStorage(query: string, results: SearchResult[]): void {
        if (!this.sessionStorage || !results.length) return;
        this.sessionStorage.setItem(query, JSON.stringify(results));
    }

    async search(config: SearchConfig): Promise<SearchResult[]> {
        const { query } = config;
        // check for cached results from session storage
        const cachedResults = this.getResultsFromSessionStorage(query);
        if (cachedResults) return cachedResults;

        const results = await this.fetchResults(config);
        this.setResultsToSessionStorage(query, results);
        return results;
    }

    async searchByCategory(config: SearchConfig): Promise<SearchResult[]> {
        const { category, query } = config;
        if (!category) {
            throw new Error('A valid category is needed when using searchByCategory.');
        }
        // check for cached results from session storage 
        const cachedResults = this.getResultsFromSessionStorage(`${category}_${query}`);
        if (cachedResults) {
            const categoryResults = cachedResults.filter(result => result.category === category);
            return categoryResults;
        }
        const results = await this.fetchResults(config);
        const categoryResults = results.filter(result => result.category === category);
        this.setResultsToSessionStorage(`${category}_${query}`, categoryResults);
        return categoryResults;
    }
}
*/

// Here is the mock SwoopClient class:
export class MockSwoopClient implements ClientCommunicator {
    // instead of using session storage, we will use a simple object
    cache: Record<string, SearchResult[]> = {};
    constructor() {
        this.cache = {};
    }

    async fetchResults(config: SearchConfig): Promise<SearchResult[]> {
        const { query, safeSearchValue, category } = config;
        const params: Record<string, any> = {
            q: query,
            language: 'en',
            safesearch: safeSearchValue ?? 0,
            format: 'json',
        };
        if (category) params[`category_${category}`] = 'on';

        const response = await axios.get<SearchData>(
            `https://api.swoopsearch.dev/search`, { params }
        );

        return response.data.results;
    }

    getResultsFromSessionStorage(query: string): SearchResult[] | null {
        if (!this.cache) return null;
        const results = this.cache.query;
        if (!results) return null;
        return results;
    }

    setResultsToSessionStorage(query: string, results: SearchResult[]): void {
        if (!this.cache || !results.length) return;
        this.cache.query = results;
    }

    async search(config: SearchConfig): Promise<SearchResult[]> {
        const { query } = config;
        // check for cached results from session storage
        const cachedResults = this.getResultsFromSessionStorage(query);
        if (cachedResults) return cachedResults;

        const results = await this.fetchResults(config);
        this.setResultsToSessionStorage(query, results);
        return results;
    }

    async searchByCategory(config: SearchConfig): Promise<SearchResult[]> {
        const { category, query } = config;
        if (!category) {
            throw new Error('A valid category is needed when using searchByCategory.');
        }
        // check for cached results from session storage 
        const cachedResults = this.getResultsFromSessionStorage(`${category}_${query}`);
        if (cachedResults) {
            const categoryResults = cachedResults.filter(result => result.category === category);
            return categoryResults;
        }
        const results = await this.fetchResults(config);
        const categoryResults = results.filter(result => result.category === category);
        this.setResultsToSessionStorage(`${category}_${query}`, categoryResults);
        return categoryResults;
    }
}
