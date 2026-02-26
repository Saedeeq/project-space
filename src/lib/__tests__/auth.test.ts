/**
 * @jest-environment node
 */
import bcrypt from 'bcryptjs';

describe('Password Hashing', () => {
  describe('bcrypt.hash', () => {
    it('should generate different hashes for same password', async () => {
      const password = 'testPassword123';
      
      const hash1 = await bcrypt.hash(password, 10);
      const hash2 = await bcrypt.hash(password, 10);

      expect(hash1).not.toBe(hash2);
    });

    it('should generate hash with correct format', async () => {
      const password = 'testPassword123';
      const hash = await bcrypt.hash(password, 10);

      // Bcrypt hashes start with $2a$ or $2b$ followed by the cost factor
      expect(hash).toMatch(/^\$2[ab]\$\d+\$/);
    });

    it('should use correct salt rounds', async () => {
      const password = 'testPassword123';
      const hash = await bcrypt.hash(password, 10);

      // Extract cost factor from hash
      const costFactor = parseInt(hash.split('$')[2]);
      expect(costFactor).toBe(10);
    });
  });

  describe('bcrypt.compare', () => {
    it('should verify correct password against hash', async () => {
      const password = 'testPassword123';
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare(password, hash);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password against hash', async () => {
      const password = 'testPassword123';
      const wrongPassword = 'wrongPassword456';
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare(wrongPassword, hash);
      expect(isValid).toBe(false);
    });

    it('should reject empty password against hash', async () => {
      const password = 'testPassword123';
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare('', hash);
      expect(isValid).toBe(false);
    });

    it('should be case-sensitive', async () => {
      const password = 'TestPassword123';
      const hash = await bcrypt.hash(password, 10);

      const isValidLowerCase = await bcrypt.compare('testpassword123', hash);
      expect(isValidLowerCase).toBe(false);

      const isValidExact = await bcrypt.compare('TestPassword123', hash);
      expect(isValidExact).toBe(true);
    });
  });

  describe('Security Properties', () => {
    it('should produce hashes of consistent length', async () => {
      const password1 = 'pass1';
      const password2 = 'verylongpassword123!';
      
      const hash1 = await bcrypt.hash(password1, 10);
      const hash2 = await bcrypt.hash(password2, 10);

      expect(hash1.length).toBe(hash2.length);
    });

    it('should hash passwords securely with salt', async () => {
      const password = 'commonPassword123';
      const hash1 = await bcrypt.hash(password, 10);
      const hash2 = await bcrypt.hash(password, 10);

      // Even with the same password, hashes should be different due to salt
      expect(hash1).not.toBe(hash2);
      
      // But both should verify correctly
      const valid1 = await bcrypt.compare(password, hash1);
      const valid2 = await bcrypt.compare(password, hash2);
      
      expect(valid1).toBe(true);
      expect(valid2).toBe(true);
    });
  });
});
