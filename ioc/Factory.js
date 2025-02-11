import { LoggerHandler } from "../api/LoggerHandler.js"
import { ServiceRouter } from "../api/ServiceRouter.js"
import { ErrorHandler } from "../api/ErrorHandler.js"
import { AuthorizationHandler } from "../api/AuthorizationHandler.js"
import { AppService } from "../domain.implementation/services/AppService.js"

/**
 * Factory object for creating pipeline handlers.
 * @namespace Factory
 */
export const Factory = {

    createInterface(interfaceName, config) {
        if (interfaceName === 'IAppService') return new AppService(config);
    },

    /**
     * Creates pipeline handlers based on the provided configuration.
     * @memberof Factory
     * @param {object} config - The configuration object.
     * @returns {object} - The pipeline handlers.
     */
    createPipelineHandlers(config) {
        return (
            new LoggerHandler(
                new ErrorHandler(
                    new AuthorizationHandler(
                        new ServiceRouter(null, Factory.createInterface('IAppService', config))
                    )
                )
            )
        )
    }
}