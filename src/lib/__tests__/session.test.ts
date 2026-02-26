/**
 * @jest-environment node
 */
import {
  generateSessionToken,
  hashSessionToken,
  createSession,
  isSessionExpired,
  getSessionExpiryDate,
  isValidTokenFormat,
} from '../session';

describe('Session Management', () => {
  describe('generateSessionToken', () => {
    it('should generate a token of correct length', () => {
      const token = generateSessionToken();
      expect(token).toHaveLength(64); // 32 bytes = 64 hex characters
    });

    it('should generate unique tokens each time', () => {
      const token1 = generateSessionToken();
      const token2 = generateSessionToken();
      expect(token1).not.toBe(token2);
    });

    it('should generate hex string tokens', () => {
      const token = generateSessionToken();
      expect(token).toMatch(/^[a-f0-9]+$/);
    });
  });

  describe('hashSessionToken', () => {
    it('should hash a token', () => {
      const token = generateSessionToken();
      const hash = hashSessionToken(token);
      expect(hash).toHaveLength(64); // SHA-256 produces 64 hex characters
    });

    it('should produce consistent hashes for same token', () => {
      const token = generateSessionToken();
      const hash1 = hashSessionToken(token);
      const hash2 = hashSessionToken(token);
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different tokens', () => {
      const token1 = generateSessionToken();
      const token2 = generateSessionToken();
      const hash1 = hashSessionToken(token1);
      const hash2 = hashSessionToken(token2);
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('createSession', () => {
    it('should create a session with all required fields', () => {
      const userId = 'test-user-id';
      const matricNumber = 'ABC123456';
      
      const session = createSession(userId, matricNumber);

      expect(session.userId).toBe(userId);
      expect(session.matricNumber).toBe(matricNumber);
      expect(session.token).toBeDefined();
      expect(session.hashedToken).toBeDefined();
      expect(session.createdAt).toBeDefined();
      expect(session.expiresAt).toBeDefined();
    });

    it('should set expiry date 7 days in the future', () => {
      const session = createSession('user-id', 'ABC123456');
      const now = new Date();
      const expectedExpiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      // Allow 1 second tolerance
      const timeDiff = Math.abs(session.expiresAt.getTime() - expectedExpiry.getTime());
      expect(timeDiff).toBeLessThan(1000);
    });

    it('should hash the session token', () => {
      const session = createSession('user-id', 'ABC123456');
      
      expect(session.hashedToken).not.toBe(session.token);
      expect(session.hashedToken).toHaveLength(64);
    });
  });

  describe('isSessionExpired', () => {
    it('should return false for future expiry date', () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hour in future
      expect(isSessionExpired(futureDate)).toBe(false);
    });

    it('should return true for past expiry date', () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hour in past
      expect(isSessionExpired(pastDate)).toBe(true);
    });

    it('should return true for expiry date in the past by 1 second', () => {
      const oneSecondAgo = new Date(Date.now() - 1000);
      expect(isSessionExpired(oneSecondAgo)).toBe(true);
    });
  });

  describe('getSessionExpiryDate', () => {
    it('should return date 7 days in future by default', () => {
      const expiry = getSessionExpiryDate();
      const expected = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      
      const timeDiff = Math.abs(expiry.getTime() - expected.getTime());
      expect(timeDiff).toBeLessThan(1000);
    });

    it('should return custom expiry date', () => {
      const days = 30;
      const expiry = getSessionExpiryDate(days);
      const expected = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      
      const timeDiff = Math.abs(expiry.getTime() - expected.getTime());
      expect(timeDiff).toBeLessThan(1000);
    });
  });

  describe('isValidTokenFormat', () => {
    it('should return true for valid token format', () => {
      const validToken = 'a'.repeat(64);
      expect(isValidTokenFormat(validToken)).toBe(true);
    });

    it('should return true for valid hex token', () => {
      const validToken = generateSessionToken();
      expect(isValidTokenFormat(validToken)).toBe(true);
    });

    it('should return false for token that is too short', () => {
      expect(isValidTokenFormat('abc123')).toBe(false);
    });

    it('should return false for token that is too long', () => {
      expect(isValidTokenFormat('a'.repeat(65))).toBe(false);
    });

    it('should return false for token with non-hex characters', () => {
      expect(isValidTokenFormat('g'.repeat(64))).toBe(false);
      expect(isValidTokenFormat('A'.repeat(64))).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isValidTokenFormat('')).toBe(false);
    });
  });
});
