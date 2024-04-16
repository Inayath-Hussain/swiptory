import { config } from "dotenv";
import { cleanEnv, port, str, num } from "envalid";

config();

export const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port({ default: 8080 }),
    MONGODB_URI: str(),
    COOKIE_PARSER_SECRET: str(),
    JWT_ACCESS_TOKEN_SECRET: str(),
    JWT_REFRESH_TOKEN_SECRET: str()
})