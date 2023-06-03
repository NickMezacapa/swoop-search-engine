import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSearchFilterState } from '@contexts/SearchFilterProvider';

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
interface ImageResult {
    template?: string;
    url?: string;
    thumbnail_src?: string;
    img_src?: string;
    content?: string;
    title?: string;
    source?: string;
    img_format?: string;
    engine?: string;
    parsed_url?: string[],
    engines?: string[],
    positions?: number[],
    score?: number;
    category?: string;
    pretty_url?: string;
    [key: string]: any;
}
interface ImageData {
    query?: string;
    number_of_results?: number;
    results?: ImageResult[];
    [key: string]: any;
}

//const BASE_SEARCH_API_URL = process.env.BASE_SEARCH_API_URL!;

export const useGetSearchResults = (query: string, forImages: boolean) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<SearchData | ImageData | null>(null);
    const { filterOption } = useSearchFilterState(); // search filter option - user setting

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
            setLoading(true);
            setError(null);
            setData(null);
            try {
                let requestUrl = `https://api.swoopsearch.dev/search?q=${query}&language=en&safesearch=${safeSearchValue}&format=json`;
                if (forImages) {
                    requestUrl += '&category_images=on'
                }
                const response: AxiosResponse = await axios.get(requestUrl);
                const responseData = response.data;
                setData(responseData)
            } catch (error) {
                setError(`🅱️ ERROR FETCHING RESULTS! Message: ${error}. 🅱️`)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, forImages, safeSearchValue]);

    return { loading, error, data };
};
