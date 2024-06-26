import { CorsOptions } from "cors"
import { env } from "./env"

console.log(env.isProd)
export const corsOptions: CorsOptions = env.isProd ?
    {
        // add react deployed origin here.
        origin: ["https://swiptory-ashy.vercel.app"],
        credentials: true
    }
    :
    {
        origin: /http:\/\/localhost:.{4}/,
        credentials: true
    }