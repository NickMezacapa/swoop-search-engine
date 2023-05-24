import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

export const ageRouter = createTRPCRouter({
    calculateAge: publicProcedure
        .input(z.object({ age: z.number() }))
        .query(({ input }) => {
            return {
                inMonths: (input.age * 12),
            };
        }),
});
