import { ErrorRequestHandler } from "express"

export interface Ierror {
    statusCode: number
    message: string
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode = 500,
        message
    } = err

    console.log("errorHandler .... ", err)
    res.status(statusCode).json({ message: message || "Internal server error" })
}