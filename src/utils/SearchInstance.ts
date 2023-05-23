import { SearchResultsProxy } from '@proxies/useGetSearchResultsProxy';

/**
 * Represents a search instance that provides
 * a specific search functionality.
 */
class SearchInstance {

    /**
     * Performs a search with the specified query
     * @param {string} query - The search query.
     */
    swoopSearch(query: string) {
        return SearchResultsProxy(query);
    }

    /**
     * Performs a search with the specified query, and automatically
     * routes the user to the first returned search result.
     * @param {string} query - The search query.
     */
    quickResultSearch(query: string) {
        console.log('quickResultSearch')
    }
}

export default SearchInstance;
