import { RequestHandler } from "express";
import { categoryValidator, editStoryBodyValidator, slidePropertiesValidator, slideStructureValidator, slidesValidator, storyIdValidator } from "./validator";
import { sanitize, sanitizeAll } from "../sanitizeBase";
import { categoryService } from "../../services/category";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

interface IStorySlide {
    heading: string
    description: string
    image: string
}

export interface IEditStoryBody {
    slides: IStorySlide[],
    category: string
    story_id: string
};


const middleware: RequestHandler<{}, {}, IEditStoryBody> = async (req, res, next) => {

    // checks if request body is an object and has three fields story_id, slides and category
    const bodyValidationResult = editStoryBodyValidator(req.body);
    if (bodyValidationResult.valid === false) return res.status(422).json({ message: bodyValidationResult.errorMessage });


    // checks if story_id is valid
    req.body.story_id = sanitize(req.body.story_id);
    const storyIdValidationResult = storyIdValidator(req.body.story_id);
    if (storyIdValidationResult.valid === false) return res.status(422).jsonp({ message: storyIdValidationResult.errorMessage })

    // checks if slides property is an array with appropriate length
    const slidesValidationResult = slidesValidator(req.body.slides);
    if (slidesValidationResult.valid === false) return res.status(422).json({ message: slidesValidationResult.errorMessage })


    let errorMessage = "";




    // validate all elements in request body array
    const isSlidesValid = req.body.slides.every(slide => {

        // check if each element is an object
        const slideStructureValidationResult = slideStructureValidator(slide);
        if (slideStructureValidationResult.valid === false) {
            errorMessage = slideStructureValidationResult.errorMessage;
            return slideStructureValidationResult.valid
        }


        // sanitize all object properties
        sanitizeAll(slide)


        // check object has valid properties
        const slideValidationResult = slidePropertiesValidator(slide)
        if (slideValidationResult.valid === false) errorMessage = slideValidationResult.errorMessage
        return slideValidationResult.valid
    })


    if (isSlidesValid === false) return res.status(422).json({ message: errorMessage })


    // category is checked at last to minimize db interactions
    const categoryOptions = await categoryService.getCategoryNames();

    // checks if category is valid option 
    const categoryValidationResult = categoryValidator(req.body.category, categoryOptions.categories)
    if (categoryValidationResult.valid === false) return res.status(422).json({ message: categoryValidationResult.errorMessage })


    return next();
}






export const validateEditStoryBody = tryCatchWrapper(middleware);