import axios, { AxiosResponse } from 'axios';

import { createFallbackSessionStorage } from '@utils/helpers/createFallbackSessionStorage';
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

    private createSessionStorage(): Storage {
        return typeof window !== 'undefined'
            ? window.sessionStorage
            : createFallbackSessionStorage();
    }

    private isSessionStorageAvailable(): boolean {
        try {
            const testKey = '__swoop_test__';
            sessionStorage.setItem(testKey, testKey);
            sessionStorage.removeItem(testKey);
            return true;
        } catch (err) {
            return false;
        }
    }

    // Check sessionStorage for query results to avoid unnecessary call
    private getResultsFromSessionStorage(query: string): SearchResult[] | null {
        if (!this.isSessionStorageAvailable()) return null;
        const storageKey = `swoop_${query}`;
        const resultsString = sessionStorage.getItem(storageKey);
        if (resultsString) return JSON.parse(resultsString);
        return null;
    }

    // Set query results in sessionStorage if they do not already exist
    private setResultsInSessionStorage(query: string, results: SearchResult[]): void {
        if (!this.isSessionStorageAvailable()) return;
        const storageKey = `swoop_${query}`;
        const resultsString = JSON.stringify(results);
        sessionStorage.setItem(storageKey, resultsString);
    }

    // All search results
    async search(config: SearchConfig): Promise<SearchResult[]> {
        const { query } = config;
        const sessionStorage = this.createSessionStorage();
        const cachedResults = this.getResultsFromSessionStorage(query);
        if (cachedResults) {
            return cachedResults;
        }

        const results = await this.fetchResults(config);
        this.setResultsInSessionStorage(query, results);
        return results;
    }

    // Query results by category ('images', 'videos' ...)
    async searchByCategory(config: SearchConfig): Promise<SearchResult[]> {
        const { query, category } = config;
        if (!category) {
            throw new Error('🅱️Category is required for searchByCategory🅱️');
        }
        const cachedResults = this.getResultsFromSessionStorage(query);
        if (cachedResults) {
            return cachedResults.filter(result => result.category === category);
        }

        const results = await this.fetchResults(config);
        const categoryResults = results.filter(result => result.category === category);
        this.setResultsInSessionStorage(query, results);
        return categoryResults;
    }
}
