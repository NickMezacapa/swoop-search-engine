import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    HOST_DOMAIN_URL: z.string().url(),
    BASE_API_URL: z.string().url(),
    BASE_SEARCH_API_URL: z.string().url(),
    BACKEND_API_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    HOST_DOMAIN_URL: process.env.HOST_DOMAIN_URL,
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_SEARCH_API_URL: process.env.BASE_SEARCH_API_URL,
    BACKEND_API_KEY: process.env.BACKEND_API_KEY
  },
});
