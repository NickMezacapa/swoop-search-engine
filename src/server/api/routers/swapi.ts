import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

// implement
import axios, { AxiosResponse } from 'axios';

interface SWCharacter {
    name: string;
    height: string;
    [key: string]: any;
}

const getCharacter = async (number?: number): Promise<any> => {
    try {
        const response: AxiosResponse<SWCharacter> = await axios.get<SWCharacter>(
            `https://swapi.dev/api/people/${number}/`
        );
        const charData = response.data;
        return charData;
    } catch (err) {
        console.log('ERROR IN REQUEST!!!', err);
    }
};

export const swapiRouter = createTRPCRouter({
    getNameFromNumber: publicProcedure
        .input(z.object({ num: z.number() }))
        .query(async ({ input }) => {
            return {
                result: await getCharacter(input.num),
            };
        }),
});

// const swapiChar = api.swapi.getNameFromNumber.useQuery({ num: 1 });
// {JSON.stringify(swapiChar?.data?.result)}
