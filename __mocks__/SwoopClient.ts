import { SwoopClient, BaseClient, SearchCategory, SearchConfig } from '../src/server/clients/SwoopClient';
import type { SearchResult } from '../src/utils/types';
import type { SearchData } from '../src/utils/types';
import axios from 'axios';

// SwoopClient Mock

export class MockSwoopClient implements BaseClient<SearchResult> {
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

        const response = await axios.get<SearchData<SearchResult>>(
            `https://asdfghjkl.dev/search`, { params }
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
