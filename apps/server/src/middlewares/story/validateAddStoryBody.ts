import { RequestHandler } from "express";

import { sanitizeAll } from "../sanitizeBase";
import { bodyValidator, categoryValidator, slidePropertiesValidator, slideStructureValidator, slidesValidator } from "./validator";
import { categoryService } from "../../services/category";


interface IStorySlide {
    heading: string
    description: string
    image: string
}

export interface IAddStoryBody {
    slides: IStorySlide[],
    category: string
};




// body - category: string, slides: obj[]

// check body is obj
// slideValidator, slideStructueValidator, slideSanitize, slidePropertyValidator
// category sanitization, categoryValidator


export const validateAddStoryBody: RequestHandler<{}, {}, IAddStoryBody> = async (req, res, next) => {

    // checks if request body is an object and has two fields slides and category
    const bodyValidationResult = bodyValidator(req.body);
    if (bodyValidationResult.valid === false) return res.status(422).json({ message: bodyValidationResult.errorMessage });


    // checks if slides property is an array with appropriate length
    const slidesValidationResult = slidesValidator(req.body.slides);
    if (slidesValidationResult.valid === false) return res.status(422).json({ message: slidesValidationResult.errorMessage })


    let errorMessage = "";




    // validate all elements in request body array
    const isRequestBodyValid = req.body.slides.every(slide => {

        // check if each element is an object
        const structureValidationResult = slideStructureValidator(slide);
        if (structureValidationResult.valid === false) {
            errorMessage = structureValidationResult.errorMessage;
            return structureValidationResult.valid
        }


        // sanitize all object properties
        sanitizeAll(slide)


        // check object has valid properties
        const slideValidationResult = slidePropertiesValidator(slide)
        if (slideValidationResult.valid === false) errorMessage = slideValidationResult.errorMessage
        return slideValidationResult.valid
    })


    if (isRequestBodyValid === false) return res.status(422).json({ message: errorMessage })


    // category is checked at last to minimize db interactions
    const categoryOptions = await categoryService.getCategoryNames();

    // checks if category is valid option 
    const categoryValidationResult = categoryValidator(req.body.category, categoryOptions.categories)
    if (categoryValidationResult.valid === false) return res.status(422).json({ message: categoryValidationResult.errorMessage })


    return next();
}