import { LoggerHandler } from "../api/LoggerHandler.js"
import { ServiceRouter } from "../api/ServiceRouter.js"
import { ErrorHandler } from "../api/ErrorHandler.js"
import { AuthorizationHandler } from "../api/AuthorizationHandler.js"
import { AppService } from "../domain.implementation/services/AppService.js"
import { OcrService } from "../domain.implementation/services/OcrService.js"
import { GoogleOcrAdapter } from "../infrastructure/GoogleOcrAdapter.js"
import { GoogleClient } from "../infrastructure/GoogleClient.js"

/**
 * Factory object for creating pipeline handlers.
 * @namespace Factory
 */
export const Factory = {

    createInterface(interfaceName, config) {
        if (interfaceName === 'IAppService') return new AppService(config);
        if (interfaceName === 'IOcrService') return new OcrService(Factory.createInterface('IOcrAdapter', config), config);
        if (interfaceName === 'IOcrAdapter') return new GoogleOcrAdapter(Factory.createInterface('IGoogleClient', config), config);
        if (interfaceName === 'IGoogleClient') return new GoogleClient(config);
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
                        new ServiceRouter(null, Factory.createInterface('IAppService', config), Factory.createInterface('IOcrService', config))
                    )
                )
            )
        )
    }
}