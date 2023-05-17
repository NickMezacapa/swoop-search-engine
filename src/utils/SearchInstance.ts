import { useRouter } from 'next/router';

/**
 * Represents a search instance that provides
 * a specific search functionality.
 */
class SearchInstance {
    public router = useRouter();

    /**
     * Performs a search with the specified query
     * @param {string} query - The search query.
     */
    swoopSearch(query: string) {
        this.router.push(`/search?term=${query}`).catch((error) => {
            console.error('An error occurred while navigating:', error);
        });
    }

    /**
     * Performs a search with the specified query, and automatically
     * routes the user to the first returned search result.
     * @param {string} query - The search query.
     */
    quickResultSearch(query: string) {
        this.router.push(`/quickResults/${query}`).catch((error) => {
            console.error('An error occurred while navigating:', error);
        });
    }
}

export default SearchInstance;
