import { RequestHandler } from "express";
import { passwordValidator, usernameValidator } from "./validator";
import { sanitizeAll } from "../sanitizeBase";



export interface IAuthRequestBody {
    username: string;
    password: string;
}

export const validateAuthRequestBody: RequestHandler<{}, {}, IAuthRequestBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { password, username } = req.body;

    const usernameValidationResult = usernameValidator(username);

    const passwordValidationResult = passwordValidator(password);


    switch (true) {
        case (usernameValidationResult.valid === false):
            return res.status(422).json({ message: usernameValidationResult.errorMessage })

        case (passwordValidationResult.valid === false):
            return res.status(422).json({ message: passwordValidationResult.errorMessage })
    }

    return next();
}