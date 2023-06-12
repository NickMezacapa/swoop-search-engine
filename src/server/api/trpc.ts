
/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

/** Replace this with an object if you want to pass things to `createContextInner`. */
type CreateContextOptions = Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 */
const createInnerTRPCContext = (_opts: CreateContextOptions) => {
    return {};
};

/**
 * This is the actual context used for router. It will be used to process every request
 * that goes through tRPC endpoint.
 */
export const createTRPCContext = (_opts: CreateNextContextOptions) => {
    return createInnerTRPCContext({});
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces used to build tRPC API.
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece used to build new queries and mutations on the tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;
