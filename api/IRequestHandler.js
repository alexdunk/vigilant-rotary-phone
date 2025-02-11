import { Context } from "./Context.js";
import { ApplicationError } from "../common/Errors.js";

/**
 * Abstract class representing a request handler.
 * All handlers should extend this class and implement the handle method.
 */
/**
 * Represents a request handler for handling incoming requests.
 */
export class IRequestHandler {
    /**
     * Handle the incoming request.
     * @param {Context} context - The context object containing request and response.
     * @returns {Promise<void>} A promise that resolves when the request handling is complete.
     */
    async invoke(context) {
        return context;
    }

    /**
     * Invoke the next request handler in the chain.
     * @param {Context} context - The context object containing request and response.
     * @returns {Promise<void>} A promise that resolves when the next request handler is invoked.
     */
    async next(context) {
        return await this._next.invoke(context);
    }

    /**
     * Create a new instance of IRequestHandler.
     * @param {IRequestHandler} next - The next request handler in the chain.
     * @throws {ApplicationError} If the next parameter is not null or an instance of IRequestHandler.
     */
    constructor(next) {
        if (next === undefined || next === null) this._next = { async invoke(context) { return context; } };
        else if (next instanceof IRequestHandler) this._next = next;
        else throw new ApplicationError('Next must be null or an instance of IRequestHandler.');
    }
}
