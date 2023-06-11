import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import { SwoopClient, SearchCategory, SearchConfig } from '@server/clients/SwoopClient';
import type { SearchResult, ImageResult } from '@utils/types';

// Define the input schema for the search procedure
const searchInputSchema = z.object({
    query: z.string().min(1),
    safeSearchValue: z.number().default(0),
    category: z.string().optional(),
});

/**
 * The search procedure is responsible for handling the search request.
 * Search results are fetched from the SwoopClient wrapper and returned.
 */
export const swoopRouter = createTRPCRouter({
    search: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
            if (input.category && !(input.category in SearchCategory)) {
                // If the category is not a valid SearchCategory, throw an error
                throw new Error(
                    `Invalid category type: ${input.category}. Please use one of 
                    the following categories: All, Images, Videos, News, Maps.`
                );
            }

            // Define the request configuration for the SwoopClient
            const requestConfig: SearchConfig = {
                query: input.query,
                safeSearchValue: input.safeSearchValue,
                category: input.category as SearchCategory ?? undefined,
            }

            // Create a new SwoopClient instance and fetch the search results
            const api: SwoopClient<SearchResult> = new SwoopClient<SearchResult>();
            const searchData: SearchResult[] = await api.search(requestConfig);
            return searchData;
        }),

    imageSearch: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
            if (input.category && !(input.category in SearchCategory)) {
                // If the category is not a valid SearchCategory, throw an error
                throw new Error(
                    `Invalid category type: ${input.category}. Please use one of 
                    the following categories: All, Images, Videos, News, Maps.`
                );
            }

            // Define the request configuration for the SwoopClient
            const requestConfig: SearchConfig = {
                query: input.query,
                safeSearchValue: input.safeSearchValue,
                category: input.category as SearchCategory ?? undefined,
            }

            // Create a new SwoopClient instance and fetch the image results
            const api: SwoopClient<ImageResult> = new SwoopClient<ImageResult>();
            const imageResults: ImageResult[] = await api.search(requestConfig);
            return imageResults;
        }),
});
