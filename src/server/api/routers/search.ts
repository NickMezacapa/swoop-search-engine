import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import { SwoopClient, SearchCategory, SearchConfig } from '@server/clients/SwoopClient';
import type { SearchResult } from '@utils/types';

const searchInputSchema = z.object({
    query: z.string(),
    safeSearchValue: z.number(),
    category: z.string().optional()
});

export const searchRouter = createTRPCRouter({
    swoopSearch: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
            if (input.category && !(input.category in SearchCategory)) {
                throw new Error(
                    `Invalid category type: ${input.category}. Please use one of 
                    the following categories: All, Images, Videos, News, Maps.`
                );
            }

            const requestConfig: SearchConfig = {
                query: input.query,
                safeSearchValue: input.safeSearchValue,
                category: input.category as SearchCategory ?? undefined,
            }

            const api: SwoopClient = new SwoopClient();
            const searchData: SearchResult[] = await api.search(requestConfig);
            return searchData;
        }),
});


// const searchResults = api.search.swoopSearch.useQuery({ query: 'dogs' });
// {JSON.stringify(searchResults?.data?.items)}
