import { createTRPCRouter } from "@server/api/trpc";
import { swoopRouter } from '@server/api/routers/swoop';

export const appRouter = createTRPCRouter({
    swoop: swoopRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
