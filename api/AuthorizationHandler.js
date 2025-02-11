import { IRequestHandler } from './IRequestHandler.js';
import { TokenValidator } from '../common/TokenValidator.js';
import { ApplicationError } from '../common/Errors.js';

/**
 * AuthorizationHandler validates the JWT token in the Authorization header.
 */
/**
 * Represents an authorization handler that validates JWT tokens.
 */
export class AuthorizationHandler extends IRequestHandler {
    /**
     * Handles authorization by validating the JWT token.
     * @param {Context} context - The context object containing the request and response.
     * @returns {Promise} A promise that resolves when the authorization is successful.
     */
    async invoke(context) {

        if (context?.request?.httpMethod === 'GET' && context?.request?.path === '/info')
            return await this.next(context);

        const token = this._getTokenFromHeaders(context?.request?.headers)
        try {
            const decoded = TokenValidator.verifyToken(token);
            context.user = decoded;
        } catch (error) {
            return context.respondWithStatus(401, { status: '401 Unauthorized' }, error);
        }
        return await this.next(context)
    }

    /**
     * Retrieves the JWT token from the request headers.
     * @param {Object} headers - The request headers.
     * @returns {string} The JWT token.
     * @throws {Error} If the Authorization header is missing or invalid.
     */
    _getTokenFromHeaders(headers) {
        if (!headers) return ApplicationError('Unauthorized: Missing or invalid Authorization header');
        const authHeader = headers['Authorization'] || headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error("'Unauthorized: Missing or invalid Authorization header'")
        }
        return authHeader.split(' ')[1];
    }
}
