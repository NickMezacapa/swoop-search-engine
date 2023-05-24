import { type NextRouter } from 'next/router';

export const handleRouting = (router: NextRouter, query: string) => {
    if (query.length === 0) return;
    router.push(`/search?q=${query}`).catch((error) => {
        console.error('An error occurred while navigating:', error);
    });;
};
