import { Request } from "express"

export declare module "express-serve-static-core" {
    interface Request {
        user_id?: String
    }
}