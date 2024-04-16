import { app } from "./app";
import { env } from "./config/env";

function main() {
    app.listen(env.PORT, () => console.log(`server listening on port ${env.PORT} in ${process.env.NODE_ENV} environment`))
}


main();