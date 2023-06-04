import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import { SwoopClient } from '@server/clients/SwoopClient';

export const searchRouter = createTRPCRouter({
    swoopSearch: publicProcedure
        .input(z.object({ query: z.string(), userOptions: z.number() }))
        .query(async ({ input }) => {
            const api = new SwoopClient('https://api.swoopsearch.dev');
            const searchData = await api.search(input.query, input.userOptions);
            return searchData;
        }),
});


// const searchResults = api.search.swoopSearch.useQuery({ query: 'dogs' });
// {JSON.stringify(searchResults?.data?.items)}
