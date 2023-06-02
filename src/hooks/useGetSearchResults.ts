import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { useSearchFilterState } from '@contexts/SearchFilterProvider';

const BASE_SEARCH_API_URL = process.env.BASE_SEARCH_API_URL!;

type SearchRequestConfig = {
    query: string;
    pageno?: number;
    forImages?: boolean;
}

interface SearchParams {
    [key: string]: string | number;
}
interface SearchResult {
    title: string;
    url: string;
    content: string;
    [key: string]: any;
}
interface SearchData {
    query: string;
    number_of_results: number;
    results: SearchResult[];
    suggestions: string[];
    [key: string]: any;
}

export const useGetSearchResults = ({ query, pageno, forImages }: SearchRequestConfig) => {
    const [searchResults, setSearchResults] = useState<SearchData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { filterOption } = useSearchFilterState() || {}; // search filters - user option. Optional chaining for undef value
    const useDummyData = true; // control for rate limiting during development

    let safeSearchValue = 0;

    // switch string filter value to number for search api usage
    switch (filterOption) {
        case 'Mid':
            safeSearchValue = 1;
            break;
        case 'Strict':
            safeSearchValue = 2;
            break;
        default:
            safeSearchValue = 0;
            break;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const params: SearchParams = {
                    q: query,
                    format: 'json',
                    pageno: pageno ?? 1,
                    safesearch: safeSearchValue ?? 0,
                };

                if (forImages) params.category_images = 'on';

                const response: AxiosResponse<string> = await axios.get<string>(
                    BASE_SEARCH_API_URL,
                    { params }
                );

                const searchResultData: SearchData = JSON.parse(response.data);
                setSearchResults(searchResultData);
            } catch (error) {
                console.log('🅱️ ERROR FETCHING RESULTS!', error);
                setSearchResults(null);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [query, safeSearchValue, pageno, forImages, useDummyData]);

    return { searchResults, isLoading };
};
