import { isURL } from "validator";


interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}



/**
 * validate's if request body is a array and appropriate number of elements
 * @param body request body
 * @returns 
 */
export const bodyValidator = (body: any): Valid | InValid => {

    switch (true) {

        case (Array.isArray(body) === false):
            return { valid: false, errorMessage: "request body should be array" }


        case (body.length < 3):
            return { valid: false, errorMessage: "Minimum 3 slides are required" }


        case (body.length > 6):
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
    if (typeof slide !== "object" || slide === null || Array.isArray(slide)) return { valid: false, errorMessage: "request body should only contain array of objects" }

    return { valid: true }
}




/**
 * checks if object has all the required properties and if their values are valid. 
 * @param slide slide object
 * @param categoryOptions available category options
 * @returns 
 */
export const slidePropertiesValidator = (slide: any, categoryOptions: string[]): Valid | InValid => {

    const headingValidationResult = _stringPropertyValidator(slide.heading, "heading");
    const descriptionValidationResult = _stringPropertyValidator(slide.description, "description");
    const imageValidationResult = imageValidator(slide.image);
    const categoryValidationResult = categoryValidator(slide.category, categoryOptions);

    switch (true) {

        case (headingValidationResult.valid === false):
            return { valid: false, errorMessage: headingValidationResult.errorMessage }


        case (descriptionValidationResult.valid === false):
            return { valid: false, errorMessage: descriptionValidationResult.errorMessage }


        case (imageValidationResult.valid === false):
            return { valid: false, errorMessage: imageValidationResult.errorMessage }


        case (categoryValidationResult.valid === false):
            return { valid: false, errorMessage: categoryValidationResult.errorMessage }


        case (Object.keys(slide).length > 4):
            return { valid: false, errorMessage: "elements should contain heading, description, image and category only." }

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



const categoryValidator = (value: any, categoryOptions: string[]): Valid | InValid => {
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