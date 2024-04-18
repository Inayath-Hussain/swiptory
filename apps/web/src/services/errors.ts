/**
 * class for cancelled api call
 */
export class CancelledError {
    message: string;

    constructor(message: string) {
        this.message = message
    }
}


/**
 * class to provide api error message
 */
export class ApiError {
    message: string;

    constructor(message: string) {
        this.message = message
    }
}



export class UnauthorizedError extends ApiError {
    constructor() {
        super("Please login again");
    }
}