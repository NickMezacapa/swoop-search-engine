import { type NextRouter } from 'next/router';

export const handleRouting = (router: NextRouter, query: string, type: string) => {
    if (query.length === 0) return;
    router.push(`${type}?q=${query}`).catch((error) => {
        console.error('An error occurred while navigating:', error);
    });;
};
