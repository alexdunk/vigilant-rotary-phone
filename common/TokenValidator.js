import jwt from 'jsonwebtoken';

/**
 * TokenValidator handles JWT token verification.
 */
/**
 * Represents a token validator for verifying JWT tokens.
 */
export class TokenValidator {
    /**
     * Creates a new instance of the TokenValidator class.
     * @param {string} secret - Secret key for verifying JWT.
     */
    constructor(secret) {
        this.secret = secret;
    }

    /**
     * Validates the JWT token.
     * @param {string} token - The JWT token to validate.
     * @returns {Object} - Decoded token if valid.
     * @throws {Error} - If the token is invalid or verification fails.
     */
    verifyToken(token) {
        return jwt.verify(token, this.secret);
    }
}
