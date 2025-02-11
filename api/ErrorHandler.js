import { IRequestHandler } from "./IRequestHandler.js";

/**
 * ErrorHandler catches and handles errors from other handlers.
 */
/**
 * Represents an error handler for handling errors in the API.
 * @class
 * @extends IRequestHandler
 */
export class ErrorHandler extends IRequestHandler {
    /**
     * Invokes the error handler.
     * @param {Object} context - The context object.
     * @returns {Promise} A promise that resolves with the result of the next handler.
     */
    async invoke(context) {
        try {
            return await this.next(context);
        } catch (error) {
            // We could look at specific error types here and respond accordingly.
            console.log(error);
            return context.respondWithStatus(500, { status: '500 Internal Server Error' }, error);
        }
    }
}
