/**
 * Represents a base error class.
 * @class _BaseError
 * @extends Error
 */
class _BaseError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = this.constructor.name;
        this.cause = cause;
    }
}

export class ApplicationError extends _BaseError { } // 500