import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const BASE_SEARCH_API_URL = process.env.BASE_SEARCH_API_URL!;

const useFetchImageResults = (query: string, pageno?: number) => {
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse<string> = await axios.get<string>(
                    BASE_SEARCH_API_URL,
                    {
                        params: {
                            q: query,
                            category_images: 'on',
                            format: 'json',
                            pageno: pageno ?? 1,
                        },
                    }
                );
                const searchResultData = response.data;
                setResults(searchResultData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching results');
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, pageno]);

    return { results, loading, error };
};

export default useFetchImageResults;
