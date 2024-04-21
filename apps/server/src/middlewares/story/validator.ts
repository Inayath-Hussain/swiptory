import { isURL } from "validator";


interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}



/**
 * validate's if request body is an object and appropriate properties are present. And validates if slides
 * @param body request body
 * @returns 
 */
export const bodyValidator = (body: any): Valid | InValid => {
    switch (true) {

        case (typeof body !== "object" || body === null || Array.isArray(body)):
            return { valid: false, errorMessage: "request body should be an object" }

        case (!body.slides):
            return { valid: false, errorMessage: "slides field is required" }

        case (!body.category):
            return { valid: false, errorMessage: "category field is required" }

        case (Object.keys(body).length !== 2):
            return { valid: false, errorMessage: "body should contain slides and category only" }


        default:
            return { valid: true }
    }
}



/**
 * checks if slides property is an array with appropriate length
 */
export const slidesValidator = (slides: any): Valid | InValid => {
    switch (true) {

        case (Array.isArray(slides) === false):
            return { valid: false, errorMessage: "slides field should be array" }

        case (slides.length < 3):
            return { valid: false, errorMessage: "Minimum 3 slides are required" }


        case (slides.length > 6):
            return { valid: false, errorMessage: "Maximum of 6 slides are allowed" }

        default:
            return { valid: true }
    }
}






/**
 * checks if value is an object
 * @param slide 
 * @returns 
 */
export const slideStructureValidator = (slide: any): Valid | InValid => {
    if (typeof slide !== "object" || slide === null || Array.isArray(slide)) return { valid: false, errorMessage: "slides should only contain array of objects" }

    return { valid: true }
}




/**
 * checks if object has all the required properties and if their values are valid. 
 * @param slide slide object
 * @param categoryOptions available category options
 * @returns 
 */
export const slidePropertiesValidator = (slide: any): Valid | InValid => {

    const headingValidationResult = _stringPropertyValidator(slide.heading, "heading");
    const descriptionValidationResult = _stringPropertyValidator(slide.description, "description");
    const imageValidationResult = imageValidator(slide.image);
    // const categoryValidationResult = categoryValidator(slide.category, categoryOptions);

    switch (true) {

        case (headingValidationResult.valid === false):
            return { valid: false, errorMessage: headingValidationResult.errorMessage }


        case (descriptionValidationResult.valid === false):
            return { valid: false, errorMessage: descriptionValidationResult.errorMessage }


        case (imageValidationResult.valid === false):
            return { valid: false, errorMessage: imageValidationResult.errorMessage }


        // case (categoryValidationResult.valid === false):
        //     return { valid: false, errorMessage: categoryValidationResult.errorMessage }


        case (Object.keys(slide).length > 3):
            return { valid: false, errorMessage: "elements should contain heading, description and image only." }

        default:
            return { valid: true }
    }
}






const imageValidator = (value: any): Valid | InValid => {

    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "image is required" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "image should contain a valid url" }

        case (isURL(value) === false):
            return { valid: false, errorMessage: "image should contain a valid url" }


        default:
            return { valid: true }
    }
}



export const categoryValidator = (value: any, categoryOptions: string[]): Valid | InValid => {
    const basicValidation = _stringPropertyValidator(value, "category");

    switch (true) {
        case (basicValidation.valid === false):
            return { valid: false, errorMessage: basicValidation.errorMessage }


        case (categoryOptions.includes(value) === false):
            return { valid: false, errorMessage: "Invalid category value. Category doesn't exist" }


        default:
            return { valid: true }
    }
}



const _stringPropertyValidator = (value: any, fieldName: string): Valid | InValid => {
    switch (true) {

        case (!value):
            return { valid: false, errorMessage: `${fieldName} is required` }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: `${fieldName} should contain atleast 1 letter` }

        default:
            return { valid: true }
    }
}