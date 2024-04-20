import { RequestHandler } from "express";

import { sanitizeAll } from "../sanitizeBase";
import { bodyValidator, slidePropertiesValidator, slideStructureValidator } from "./validator";
import { categoryService } from "../../services/category";


interface IStorySlide {
    heading: string
    description: string
    image: string
    category: string
}

export type IAddStoryBody = IStorySlide[];




export const validateAddStoryBody: RequestHandler<{}, {}, IAddStoryBody> = async (req, res, next) => {

    const bodyValidationResult = bodyValidator(req.body);
    if (bodyValidationResult.valid === false) return res.status(422).json({ message: bodyValidationResult.errorMessage });


    let errorMessage = "";


    const categoryOptions = await categoryService.getCategoryNames();


    // validate all elements in request body array
    const isRequestBodyValid = req.body.every(slide => {

        // check if each element is an object
        const structureValidationResult = slideStructureValidator(slide);
        if (structureValidationResult.valid === false) {
            errorMessage = structureValidationResult.errorMessage;
            return structureValidationResult.valid
        }


        // sanitize all object properties
        sanitizeAll(slide)


        // check object has valid properties
        const slideValidationResult = slidePropertiesValidator(slide, categoryOptions.categories)
        if (slideValidationResult.valid === false) errorMessage = slideValidationResult.errorMessage
        return slideValidationResult.valid
    })



    if (isRequestBodyValid === false) return res.status(422).json({ message: errorMessage })


    return next();
}