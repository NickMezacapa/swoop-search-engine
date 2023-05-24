import { createTRPCRouter } from "@server/api/trpc";
import { searchRouter } from '@server/api/routers/search';
import { swapiRouter } from './routers/swapi';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    swapi: swapiRouter,
    search: searchRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
