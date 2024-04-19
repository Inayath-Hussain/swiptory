import { RequestHandler } from "express";

import { AddCategoryBodyError } from "./errors";
import { nameAndImageValidator } from "./validator";
import { sanitizeAll } from "../sanitizeBase";


export interface IAddCategoryBody {
    name: string;
    imageURL: string
}

export const validateAddCategoryBody: RequestHandler<{}, {}, IAddCategoryBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { imageURL, name } = req.body;

    const errorObj = new AddCategoryBodyError("Invalid body.");

    const nameValidationResult = nameAndImageValidator(name, "name");
    if (nameValidationResult.valid === false) errorObj.addFieldError("name", nameValidationResult.errorMessage)

    const imageURLValidationResult = nameAndImageValidator(imageURL, "image");
    if (imageURLValidationResult.valid === false) errorObj.addFieldError("imageURL", imageURLValidationResult.errorMessage)


    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj);

    return next();
}