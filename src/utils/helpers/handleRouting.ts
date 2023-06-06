import { type NextRouter } from 'next/router';

/**
 * @function handleRouting
 * @description
 * Handles navigation in Next.js using the provided router object.
 * Navigates to the specified route with the given query parameters.
 * 
 * @param {NextRouter} router - The Next.js router object for navigation.
 * @param {string} query - The search query to be included in the navigation.
 * @param {string} type - The type of page or route to navigate to. ('images', 'videos'...)
 * @param {number=} pageno - The page number for paginated navigation (optional, default = 1).
 * @param {string|number=} safeSearch - The safe search value for navigation (optional, default = 0).
 *
 * @return {void}
 *
 * @throws {Error} If the query length is zero.
 */
export const handleRouting = (router: NextRouter, query: string, type: string, pageno?: number, safeSearch?: string | number): void => {
    if (query.length === 0) return;
    router.push(`${type}?q=${query}&pageno=${pageno ?? 1}&safesearch=${safeSearch ?? 0}`).catch((error) => {
        console.error('An error occurred while navigating:', error);
    });;
};
