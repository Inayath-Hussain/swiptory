import { isLength, isStrongPassword } from "validator"

interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


export const usernameValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "username is required" }

        case (typeof value === "number"):
            return { valid: false, errorMessage: "username should contain letters" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "username should be of type string" }

        default:
            return { valid: true }
    }
}




export const passwordValidator = (value: any): Valid | InValid => {
    switch (true) {
        // if value is falsy
        case (!value):
            return { valid: false, errorMessage: "password is required" }


        case (typeof value === "number"):
            return { valid: false, errorMessage: "password should contain letters" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "password should be of type string" }

        // checks if password meets length requirement
        case (isLength(value, { min: 8 }) === false):
            return { valid: false, errorMessage: "password must be 8 letters long" }

        // checks if password meets constraints
        case (isStrongPassword(value, { minNumbers: 1, minSymbols: 1, minUppercase: 1 }) === false):
            return { valid: false, errorMessage: "password must contain atleast 1 number, 1 upper case letter and 1 special symbol" }

        default:
            return { valid: true }
    }
}