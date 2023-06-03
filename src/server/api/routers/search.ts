import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

/* import { fetchSearchResults } from '@utils/helpers/fetchSearchResults';
import { fetchImageResults } from '@utils/helpers/fetchImageResults'; */

const searchRouter = createTRPCRouter({
    /*     swoopSearch: publicProcedure
            .input(z.object({ query: z.string() }))
            .query(async ({ input }) => {
                const searchResults = await fetchSearchResults(input.query)
                return {
                    items: searchResults,
                };
            }),
        imageSearch: publicProcedure
            .input(z.object({ query: z.string() }))
            .query(async ({ input }) => {
                const imageResults = await fetchImageResults(input.query)
                return {
                    items: imageResults,
                }
            }), */
});

export { searchRouter };

// const searchResults = api.search.swoopSearch.useQuery({ query: 'dogs' });
// {JSON.stringify(searchResults?.data?.items)}
