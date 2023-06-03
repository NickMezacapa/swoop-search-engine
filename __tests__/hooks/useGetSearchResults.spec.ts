import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { waitFor } from '@testing-library/react';
import { useGetSearchResults } from '@hooks/useGetSearchResults';

jest.mock('axios');

describe('useGetSearchResults', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch default search results', async () => {
        const responseData = { /* mocked response data */ };
        const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });

        const { result } = renderHook(() => useGetSearchResults('example query', false));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toBeNull();

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.data).toEqual(responseData);
        });

        expect(axiosGetMock).toHaveBeenCalledWith(
            'https://api.swoopsearch.dev/search?q=example/*'
        );
    });

    it('should fetch image search results', async () => {
        const responseData = { /* mocked response data */ };
        const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });

        const { result } = renderHook(() => useGetSearchResults('example query', true));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toBeNull();

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.data).toEqual(responseData);
        });

        expect(axiosGetMock).toHaveBeenCalledWith(
            'https://api.swoopsearch.dev/search?q=example%20query&language=en&safesearch=0&format=json&category_images=on'
        );
    });

    it('should handle API error', async () => {
        const errorMessage = 'API error';
        jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useGetSearchResults('example query', false));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toBeNull();

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe(`🅱️ ERROR FETCHING RESULTS! Message: Error: ${errorMessage}. 🅱️`);
            expect(result.current.data).toBeNull();
        });
    });
});
