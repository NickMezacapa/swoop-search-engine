import { type NextRouter } from 'next/router';

export const handleRouting = (router: NextRouter, query: string, type: string, pageno?: number, safeSearch?: string | number) => {
    if (query.length === 0) return;
    router.push(`${type}?q=${query}&pageno=${pageno ?? 1}&safesearch=${safeSearch ?? 0}`).catch((error) => {
        console.error('An error occurred while navigating:', error);
    });;
};
