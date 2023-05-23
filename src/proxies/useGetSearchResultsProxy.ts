import { useMemo, useRef } from 'react';
import { useGetSearchResults } from '@/hooks/useGetSearchResults';

/**
 * @name SearchResultsProxy
 * @description a proxy hook that caches the search results during the session given 
 * a specific query. If the cache contains the query, it will return the mapped
 * search result object without making additional API calls. If it is not present,
 * the call is made and the returned result object is added to sessionCache.
 * 
 * @param {string} query - the search query
 * @returns {*} searchResults - the cached results object for the query
 * 
 * @example
 * const query = 'foo';
 * const searchResults = useGetSearchResultsProxy(query);
 * console.log(searchResults);    // search results
 */

const CacheResultFromQuery = (query: string, cache: Storage): void => {
    alert('call made')
    const searchResults = useGetSearchResults(query);
    cache.setItem(query, JSON.stringify(searchResults));
};

export const SearchResultsProxy = (query: string) => {
    const sessionCacheRef = useRef(sessionStorage);
    const sessionCache = useMemo(() => {
        const cacheString = sessionCacheRef.current.getItem(query);
        return new Map(JSON.parse(cacheString ?? ''));
    }, [query]);

    const cachedResultRef = useRef<unknown>(null);

    if (sessionCache.has(query)) {
        return sessionCache.get(query);
    } else {
        CacheResultFromQuery(query, sessionStorage);
    }

    cachedResultRef.current = sessionCache.get(query);

    return cachedResultRef.current;
};
