import axios from 'axios';
import { SwoopClient, SearchCategory, type SearchConfig } from '@server/clients/SwoopClient';
import type { SearchResult } from '@utils/types';

import { MockSwoopClient } from '../../__mocks__/SwoopClient';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Only tests public methods
describe('SwoopClient', () => {
    let swoopClient: MockSwoopClient;

    beforeEach(() => {
        swoopClient = new MockSwoopClient();
        jest.clearAllMocks();
    });

    describe('search', () => {
        const query = 'https://api.swoopsearch.dev/search';
        const safeSearchValue = 1;
        const config: SearchConfig = { query, safeSearchValue };
        const results: SearchResult[] = [
            { title: 'foo', category: SearchCategory.Images, content: 'bar', url: 'https://www.google.com/' },
        ];

        describe('when given a valid config object', () => {
            it('executes a search for the query in the config', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });

                const searchResults = await swoopClient.search(config);

                expect(searchResults).toEqual(results);
                expect(mockedAxios.get).toHaveBeenCalledWith(
                    expect.stringContaining(query),
                    expect.anything()
                );
            });

            it('applies a safe search filter if provided', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });

                const searchResults = await swoopClient.search(config);

                expect(searchResults).toEqual(results);
                expect(mockedAxios.get).toHaveBeenCalledWith(
                    expect.anything(),
                    expect.objectContaining({ params: expect.objectContaining({ safesearch: safeSearchValue }) })
                );
            });

            it('caches the results in session storage', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });

                await swoopClient.search(config);

                expect(swoopClient.cache.query).toEqual(results);
            });

            it('returns the cached results if they exist before making a call', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });
                swoopClient.cache.query = results;

                const searchResults = await swoopClient.search(config);

                expect(searchResults).toEqual(results);
                expect(mockedAxios.get).not.toHaveBeenCalled();
            });
        });
    });

    describe('searchByCategory', () => {
        const query = 'https://api.swoopsearch.dev/search';
        const safeSearchValue = 1;
        const category = SearchCategory.Images;
        const config: SearchConfig = { query, safeSearchValue, category };
        const results: SearchResult[] = [
            { title: 'foo', category: SearchCategory.Images, content: 'bar', url: 'https://www.google.com/' },
        ];

        describe('when given a valid config object', () => {
            it('executes a search for the query in the config', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });

                const searchResults = await swoopClient.searchByCategory(config);

                expect(searchResults).toEqual(results);
                expect(mockedAxios.get).toHaveBeenCalledWith(
                    expect.stringContaining(query),
                    expect.anything()
                );
            });

            it('applies a safe search filter if provided', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });

                const searchResults = await swoopClient.searchByCategory(config);

                expect(searchResults).toEqual(results);
                expect(mockedAxios.get).toHaveBeenCalledWith(
                    expect.anything(),
                    expect.objectContaining({ params: expect.objectContaining({ safesearch: safeSearchValue }) })
                );
            });

            it('applies a category filter if provided', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });

                const searchResults = await swoopClient.searchByCategory(config);

                expect(searchResults).toEqual(results);
                expect(mockedAxios.get).toHaveBeenCalledWith(
                    expect.anything(),
                    expect.objectContaining({ params: expect.objectContaining({ 'category_images': 'on' }) })
                );
            });

            it('caches the results in session storage', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });

                await swoopClient.searchByCategory(config);

                expect(swoopClient.cache.query).toEqual(results);
            });

            it('returns the cached results if they exist before making a call', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: { results } });
                swoopClient.cache[`${category}_${query}`] = results;

                const searchResults = await swoopClient.searchByCategory(config);

                expect(searchResults).toEqual(results);
                expect(mockedAxios).not.toHaveBeenCalled();
            });
        });
    });
});
