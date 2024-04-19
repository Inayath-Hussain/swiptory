interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


export const nameAndImageValidator = (value: any, fieldName: "name" | "image"): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: `${fieldName} is required` }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: `${fieldName} should be of type string` }

        default:
            return { valid: true }
    }
}