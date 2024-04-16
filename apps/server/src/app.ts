import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { corsOptions } from "./config/corsOptions";
import { env } from "./config/env";
import { mainRouter } from "./routes";
import { errorHandler } from "./controllers/errorHandler";


const app = express();


// middlewares
const morganHandler = env.isProduction ? morgan("combined") : morgan("dev")
app.use(morganHandler);
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser(env.COOKIE_PARSER_SECRET))


app.use("/api", mainRouter);





app.use(errorHandler);


export { app }