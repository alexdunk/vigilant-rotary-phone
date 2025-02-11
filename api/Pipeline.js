import { Context } from "./Context.js";

/**
 * Pipeline class creates and orchestrates the execution of request handlers.
 */
/**
 * Represents a pipeline that processes events.
 */
export class Pipeline {
    /**
     * Creates a new Pipeline instance.
     * @param {Object} config - The application configuration.
     * @param {Object} factory - The factory object used to create pipeline handlers.
     */
    constructor(config, factory) {
        this.config = config;
        this.factory = factory;
        this.handlers = this.factory.createPipelineHandlers(config);
    }

    /**
     * Runs the pipeline with the given event.
     * @param {Object} event - The event to be processed by the pipeline.
     * @returns {Promise} A promise that resolves with the result of the pipeline execution.
     */
    async run(event) {
        const context = new Context(event);
        return await this.handlers.invoke(context);
    }
}