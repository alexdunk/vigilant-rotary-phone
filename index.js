import { Pipeline } from './api/Pipeline.js';
import { AppConfig } from './AppConfig.js';
import { Factory } from './ioc/Factory.js';

/**
 * Lambda handler function
 * @param {Object} event - The ALB event triggering the Lambda.
 * @returns {Object} - The response object to be returned to ALB.
 */
export const handler = async (event) => {
    const pipeline = new Pipeline(AppConfig, Factory);
    const context = await pipeline.run(event);
    return context.response;
};
