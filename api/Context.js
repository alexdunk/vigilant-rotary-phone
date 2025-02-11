/**
 * Context class to manage request and response data.
 */
/**
 * Represents the context of an API request.
 */
export class Context {
    /**
     * Creates a new instance of the Context class.
     * @param {Object} event - The ALB event.
     */
    constructor(event) {
        this.request = {
            httpMethod: event?.httpMethod || '',
            path: event?.path || '',
            queryStringParameters: event?.queryStringParameters || {},
            headers: event?.headers || {},
            isBase64Encoded: event?.isBase64Encoded || false,
            body: event?.body || '',
        };

        this.response = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            isBase64Encoded: event?.isBase64Encoded || false,
            body: '',
            bodyCompressed: null,
        };
    }

    /**
     * Sets the response status and body.
     * @param {number|string} statusCode - The HTTP status code.
     * @param {string} responseValue - The response body as a string.
     * @param {Error|null} [error=null] - Optional error object.
     * @returns {Context} - Returns the context instance for chaining.
     */
    respondWithStatus(statusCode, responseValue, error = null) {
        this.response.statusCode = Number(statusCode);
        this.response.body = JSON.stringify(responseValue ?? null);

        if (error) { }

        return this;
    }
}
