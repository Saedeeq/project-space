import { randomBytes, createHash } from 'crypto';

/**
 * Session token utilities for secure user authentication
 */

/**
 * Generate a secure session token
 * @returns A cryptographically secure random token
 */
export const generateSessionToken = (): string => {
  return randomBytes(32).toString('hex');
};

/**
 * Hash a session token for secure storage
 * @param token - The token to hash
 * @returns SHA-256 hash of the token
 */
export const hashSessionToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex');
};

/**
 * Session data structure
 */
export interface SessionData {
  userId: string;
  matricNumber: string;
  token: string;
  hashedToken: string;
  createdAt: Date;
  expiresAt: Date;
}

/**
 * Session configuration
 */
const SESSION_CONFIG = {
  // Session expires after 7 days
  EXPIRY_DAYS: 7,
  // Token length in bytes (32 bytes = 64 hex characters)
  TOKEN_LENGTH: 32,
};

/**
 * Create a new session for a user
 * @param userId - The user's database ID
 * @param matricNumber - The user's matric number
 * @returns Session data with token and expiry
 */
export const createSession = (userId: string, matricNumber: string): SessionData => {
  const token = generateSessionToken();
  const hashedToken = hashSessionToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_CONFIG.EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  return {
    userId,
    matricNumber,
    token,
    hashedToken,
    createdAt: now,
    expiresAt,
  };
};

/**
 * Check if a session is expired
 * @param expiresAt - The session expiry date
 * @returns True if expired, false otherwise
 */
export const isSessionExpired = (expiresAt: Date): boolean => {
  return new Date() > expiresAt;
};

/**
 * Get session expiry date
 * @param days - Number of days until expiry
 * @returns Expiry date
 */
export const getSessionExpiryDate = (days: number = SESSION_CONFIG.EXPIRY_DAYS): Date => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};

/**
 * Validate session token format
 * @param token - The token to validate
 * @returns True if valid format, false otherwise
 */
export const isValidTokenFormat = (token: string): boolean => {
  // Token should be 64 hex characters (32 bytes)
  return /^[a-f0-9]{64}$/.test(token);
};
