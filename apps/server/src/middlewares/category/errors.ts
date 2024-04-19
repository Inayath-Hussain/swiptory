import { IAddCategoryBody } from "./validateAddCategoryBody";


type IAddCategoryBodyError = {
    message: string;
    errors: {
        [key in keyof Partial<IAddCategoryBody>]: string
    }
}


export class AddCategoryBodyError implements IAddCategoryBodyError {
    message: string;
    errors: IAddCategoryBodyError["errors"];

    constructor(message: string, errors = {}) {
        this.message = message;
        this.errors = errors;
    }


    addFieldError(key: keyof AddCategoryBodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage
    }
}