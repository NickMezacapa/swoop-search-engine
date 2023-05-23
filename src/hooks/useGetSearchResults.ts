import { useEffect, useState } from 'react';

import useAxios from '@/hooks/useAxios';
import { useParseHtml } from '@/hooks/useParseHtml';
import { type SearchResult } from '@/hooks/useParseHtml';

const BASE_SEARCH_URL = 'https://api.swoopsearch.dev/search';

/**
 * @name useGetSearchResults
 * @description custom hook to get the search results based on a query.
 * 
 * @param {string} query - the search query
 * @returns {SearchResult[]} searchResults - the array of search results
 * 
 * @example
 * const query = 'foo';
 * const searchResults = useGetSearchResults(query);
 * console.log(searchResults);    // array of search results - [{...}, {...}, ...]
 */

export const useGetSearchResults = (query: string): SearchResult[] => {
    const [responseHTML, setResponseHTML] = useState<string>('');

    // config for making the request
    const requestConfig = {
        url: BASE_SEARCH_URL,
        params: {
            q: query,
        },
    }
    // array of deps. that trigger the request on change
    const dependencies = [query];

    // useAxios hook - execute GET req. from given config
    const [response, controls] = useAxios(requestConfig, dependencies);

    if (response.type === 'success') {
        setResponseHTML(response.data);
    }

    // useParseHtml hook - parse html and extract information
    const searchResults = useParseHtml(responseHTML);

    return searchResults;
};
