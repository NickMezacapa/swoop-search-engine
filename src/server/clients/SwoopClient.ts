/**
 * @module api/clients/SwoopClient
 * @file This is the custom client for the Swoop API.
 * 
 * @description
 * The SwoopClient class is a custom wrapper designed to simplify interactions with the Swoop API.
 * It provides a streamlined interface for making requests using tRPC procedure calls, reducing the 
 * complexity and boilerplate involved in direct API querying. 
 * 
 * This class is primarily utilized within the `swoopRouter` located in `src/server/api/routers/swoop.ts`. 
 * By leveraging the SwoopClient wrapper, procedure calls query this class instead of directly querying the API, 
 * allowing for improved code organization and encapsulation. The wrapper handles the underlying API requests 
 * and data retrieval, returning the relevant data to the procedure call for further processing.
 */

import axios, { AxiosResponse } from 'axios';
import type { SearchResult, SearchData } from '@utils/types';

type SwoopApiResponse<T> = AxiosResponse<SearchData<T>>;

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

export interface ClientCommunicator<T extends SearchResult> {
    search(config: SearchConfig): Promise<T[]>;
    searchByCategory(config: SearchConfig): Promise<T[]>;
}

const BASE_API_URL = process.env.BASE_SEARCH_API_URL;

export class SwoopClient<T extends SearchResult> implements ClientCommunicator<T> {
    sessionStorage: Storage | undefined;
    constructor() {
        if (!BASE_API_URL) {
            throw new Error('A valid URL is required for SwoopClient.');
        }
        if (typeof window !== 'undefined') {
            this.sessionStorage = window.sessionStorage;
        }
    }

    private async fetchResults(config: SearchConfig): Promise<T[]> {
        const { query, safeSearchValue, category } = config;
        const params: Record<string, any> = {
            q: query,
            language: 'en',
            safesearch: safeSearchValue ?? 0,
            format: 'json',
        };
        if (category) params[`category_${category}`] = 'on';

        const response: SwoopApiResponse<T> = await axios.get<SearchData<T>>(
            `${BASE_API_URL}`, { params }
        );

        return response.data.results;
    }

    private getResultsFromSessionStorage(query: string): T[] | null {
        if (!this.sessionStorage) return null;
        const results = this.sessionStorage.getItem(query);
        if (!results) return null;
        return JSON.parse(results);
    }

    private setResultsToSessionStorage(query: string, results: T[]): void {
        if (!this.sessionStorage || !results.length) return;
        this.sessionStorage.setItem(query, JSON.stringify(results));
    }

    /**
     * Retrieves all search results for the specified query.
     * If the results are cached in session storage, they will be returned.
     * Otherwise, the results will be fetched from the API and cached in session storage.
     * @param {SearchConfig} config - The search configuration object, contains the query and other search parameters.
     * @return {Promise<SearchResult[]>} - A promise that resolves to an array of search results.
     */
    async search(config: SearchConfig): Promise<T[]> {
        const { query } = config;
        // check for cached results from session storage
        const cachedResults = this.getResultsFromSessionStorage(query);
        if (cachedResults) return cachedResults;

        const results = await this.fetchResults(config);
        this.setResultsToSessionStorage(query, results);
        return results;
    }

    /**
     * Retrieves search results for the specified query and category.
     * This is used when a user wants to search for only 'images' or only 'videos', etc.
     * If the results are cached in session storage, they will be returned.
     * Otherwise, the results will be fetched from the API and cached in session storage.
     * @param {SearchConfig} config - The search configuration object, contains the query and other search parameters.
     * @return {Promise<SearchResult[]>} - A promise that resolves to an array of search results belonging to category.
     * @throws {Error} - Throws error if a valid category is not provided in config.
     */
    async searchByCategory(config: SearchConfig): Promise<T[]> {
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
