import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import { fetchSearchResults } from '@utils/helpers/fetchSearchResults';

export const searchRouter = createTRPCRouter({
    swoopSearch: publicProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ input }) => {
            return {
                items: await fetchSearchResults(input.query),
            };
        }),
});

// const searchResults = api.search.swoopSearch.useQuery({ query: 'dogs' });
// {JSON.stringify(searchResults?.data?.items)}
