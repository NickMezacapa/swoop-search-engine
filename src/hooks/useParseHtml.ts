import { useEffect, useMemo, useState } from 'react';
import * as cheerio from 'cheerio';

/**
 * @name useParseHtml
 * @description custom hook to parse HTML response using Cheerio, and
 * extract necessary information to create search result object.
 * 
 * @param {string | any} html - the HTML to parse
 * @returns {SearchResult[]} searchResults - array of parsed result objects
 * 
 * @example
 * const html = '<html>...</html>';
 * const searchResults = useParseHtml(html);
 * console.log(searchResults);   // Array of parsed result objects: [{...}, {...}, {...}, ...]
 */

export interface SearchResult {
    title: string;
    url: string;
    content: string;
}

export const useParseHtml = (html: string) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    // memoize cheerio.load fn - 
    // ensure only recreated when html changes
    const $ = cheerio.load(html, null, false);

    $('article').each((index, element) => {
        const title = $(element).find('h3 .highlight').text();
        const url = $(element).find('h3 a').attr('href');
        const content = $(element).find('.content').text();

        const result: SearchResult = {
            title: title,
            url: url ?? '',
            content: content,
        };

        setSearchResults((prev) => [...prev, result]);
    });

    return searchResults;
};
