import { IRequestHandler } from './IRequestHandler.js';

/**
 * LoggerHandler logs the details of each incoming request.
 */
export class LoggerHandler extends IRequestHandler {
    /**
     * Logs the request details and proceeds to the next handler.
     * @param {Context} context - The context object containing request and response.
     * @param {Function} next - Function to call the next handler in the pipeline.
     * @returns {Promise<Context>} The updated context object after invoking the next handler.
     */
    async invoke(context) {
        this._log(context.request);

        // Proceed to the next handler in the pipeline
        context = await this.next(context);

        return context;
    }

    /**
     * Logs the given object.
     * @param {any} logObj - The object to be logged.
     * @returns {LoggerHandler} The current LoggerHandler instance.
     */
    _log(logObj) {
        console.log(logObj);
        return this;
    }
}
