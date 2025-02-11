import { ApplicationError } from "../common/Errors.js";
import { IRequestHandler } from "./IRequestHandler.js";
import { IAppService } from "../domain/services/IAppService.js";

/**
 * Represents a service router that handles incoming requests and routes them to the appropriate service.
 */
export class ServiceRouter extends IRequestHandler {
    /**
     * Invokes the service router to handle the incoming request.
     * @param {Context} context - The request context.
     * @returns {Context} The updated request context.
     */
    async invoke(context) {
        context = await this._routeToService(context);
        return context;
    }

    /**
     * Constructs a new instance of the ServiceRouter class.
     * @param {IRequestHandler} next - The next request handler in the chain.
     * @param {Array} services - The list of available services.
     */
    constructor(next, appService) {
        super(next);
        /** @type {IAppService} */ this._appService = appService;
    }

    /**
     * Routes the incoming request to the appropriate service based on the request method and path.
     * @param {Context} context - The request context.
     * @returns {Context} The updated request context.
     * @throws {ApplicationError} If the requested resource is not found.
     */
    async _routeToService(context) {
        const method = context?.request?.httpMethod;
        const path = context?.request?.path;
        const queryStringParameters = context.request.queryStringParameters;

        if (method === 'GET' && path === '/info') {
            const result = this._appService.getAppInfo();
            return context.respondWithStatus(200, result);
        }

        throw new ApplicationError("Resource not found.")
    }

    /**
     * Retrieves the application information.
     * @returns {Object} The application information.
     */
    _getAppInfo() {
        return {
            name: 'MyApp',
            version: '1.0.0'
        }
    }
}