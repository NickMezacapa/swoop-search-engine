import { createTRPCRouter } from "@server/api/trpc";
import { swoopRouter } from '@server/api/routers/swoop';

/**
 * This is the primary router for the server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    swoop: swoopRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
