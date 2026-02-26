/**
 * @jest-environment node
 */
import { User, Project } from '../models';

describe('User Model Schema Validation', () => {
  describe('Valid User Creation', () => {
    it('should create a valid user document', () => {
      const userData = {
        name: 'John',
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        password: 'password123',
        department: 'Computer Science',
      };

      const user = new User(userData);
      
      expect(user.name).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.matricNumber).toBe('ABC123456');
      expect(user.password).toBe('password123');
      expect(user.department).toBe('Computer Science');
    });
  });

  describe('Required Field Validation', () => {
    it('should fail validation without name', async () => {
      const user = new User({
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        password: 'password123',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
      expect(error.errors.name.message).toBe('Name is required');
    });

    it('should fail validation without lastName', async () => {
      const user = new User({
        name: 'John',
        matricNumber: 'ABC123456',
        password: 'password123',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.lastName).toBeDefined();
      expect(error.errors.lastName.message).toBe('Last name is required');
    });

    it('should fail validation without matricNumber', async () => {
      const user = new User({
        name: 'John',
        lastName: 'Doe',
        password: 'password123',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.matricNumber).toBeDefined();
      expect(error.errors.matricNumber.message).toBe('Matric number is required');
    });

    it('should fail validation without password', async () => {
      const user = new User({
        name: 'John',
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
      expect(error.errors.password.message).toBe('Password is required');
    });

    it('should fail validation without department', async () => {
      const user = new User({
        name: 'John',
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        password: 'password123',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.department).toBeDefined();
      expect(error.errors.department.message).toBe('Department is required');
    });
  });

  describe('String Length Validation', () => {
    it('should fail validation with password shorter than 8 characters', async () => {
      const user = new User({
        name: 'John',
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        password: 'short',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
      expect(error.errors.password.message).toBe('Password must be at least 8 characters');
    });

    it('should fail validation with matricNumber shorter than 6 characters', async () => {
      const user = new User({
        name: 'John',
        lastName: 'Doe',
        matricNumber: 'ABC',
        password: 'password123',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.matricNumber).toBeDefined();
      expect(error.errors.matricNumber.message).toBe('Matric number must be at least 6 characters');
    });

    it('should fail validation with name shorter than 2 characters', async () => {
      const user = new User({
        name: 'J',
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        password: 'password123',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
      expect(error.errors.name.message).toBe('Name must be at least 2 characters');
    });

    it('should fail validation with lastName shorter than 2 characters', async () => {
      const user = new User({
        name: 'John',
        lastName: 'D',
        matricNumber: 'ABC123456',
        password: 'password123',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.lastName).toBeDefined();
      expect(error.errors.lastName.message).toBe('Last name must be at least 2 characters');
    });
  });

  describe('String Trimming', () => {
    it('should trim whitespace from name', async () => {
      const user = new User({
        name: '  John  ',
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        password: 'password123',
        department: 'Computer Science',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeUndefined();
      expect(user.name).toBe('John');
    });

    it('should trim whitespace from all string fields', async () => {
      const user = new User({
        name: '  John  ',
        lastName: '  Doe  ',
        matricNumber: '  ABC123456  ',
        password: 'password123',
        department: '  Computer Science  ',
      });

      const error = await user.validate().catch((e) => e);
      expect(error).toBeUndefined();
      expect(user.name).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.matricNumber).toBe('ABC123456');
      expect(user.department).toBe('Computer Science');
    });
  });

  describe('Timestamps', () => {
    it('should define createdAt and updatedAt in schema', () => {
      const user = new User({
        name: 'John',
        lastName: 'Doe',
        matricNumber: 'ABC123456',
        password: 'password123',
        department: 'Computer Science',
      });

      // Timestamps are set by Mongoose when saving to database
      // Here we verify the schema has timestamps enabled
      expect(user.schema.options.timestamps).toBe(true);
    });
  });
});

describe('Project Model Schema Validation', () => {
  describe('Valid Project Creation', () => {
    it('should create a valid project document', () => {
      const projectData = {
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      };

      const project = new Project(projectData);
      
      expect(project.studentMatric).toBe('ABC123456');
      expect(project.title).toBe('My Awesome Project');
      expect(project.description).toBe('This is a description of my awesome project');
      expect(project.documentation).toBe('Project documentation here');
      expect(project.votes).toBe(0);
    });
  });

  describe('Required Field Validation', () => {
    it('should fail validation without studentMatric', async () => {
      const project = new Project({
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.studentMatric).toBeDefined();
      expect(error.errors.studentMatric.message).toBe('Student matric number is required');
    });

    it('should fail validation without title', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.title).toBeDefined();
      expect(error.errors.title.message).toBe('Project title is required');
    });

    it('should fail validation without description', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        documentation: 'Project documentation here',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.description).toBeDefined();
      expect(error.errors.description.message).toBe('Project description is required');
    });

    it('should fail validation without documentation', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.documentation).toBeDefined();
      expect(error.errors.documentation.message).toBe('Project documentation is required');
    });
  });

  describe('String Length Validation', () => {
    it('should fail validation with title shorter than 3 characters', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'AB',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.title).toBeDefined();
      expect(error.errors.title.message).toBe('Title must be at least 3 characters');
    });

    it('should fail validation with description shorter than 10 characters', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'Short',
        documentation: 'Project documentation here',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.description).toBeDefined();
      expect(error.errors.description.message).toBe('Description must be at least 10 characters');
    });

    it('should fail validation with studentMatric shorter than 6 characters', async () => {
      const project = new Project({
        studentMatric: 'ABC',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeDefined();
      expect(error.errors.studentMatric).toBeDefined();
      expect(error.errors.studentMatric.message).toBe('Matric number must be at least 6 characters');
    });
  });

  describe('Default Values', () => {
    it('should set default votes to 0', () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      });

      expect(project.votes).toBe(0);
    });
  });

  describe('Number Validation', () => {
    it('should allow positive votes', () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
        votes: 10,
      });

      expect(project.votes).toBe(10);
    });

    it('should allow zero votes', () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
        votes: 0,
      });

      expect(project.votes).toBe(0);
    });
  });

  describe('String Trimming', () => {
    it('should trim whitespace from all string fields', async () => {
      const project = new Project({
        studentMatric: '  ABC123456  ',
        title: '  My Awesome Project  ',
        description: '  This is a description  ',
        documentation: '  Documentation  ',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeUndefined();
      expect(project.studentMatric).toBe('ABC123456');
      expect(project.title).toBe('My Awesome Project');
      expect(project.description).toBe('This is a description');
      expect(project.documentation).toBe('Documentation');
    });
  });

  describe('Optional Fields', () => {
    it('should allow optional link field', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
        link: 'https://github.com/user/project',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeUndefined();
      expect(project.link).toBe('https://github.com/user/project');
    });

    it('should work without optional link field', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      });

      const error = await project.validate().catch((e) => e);
      expect(error).toBeUndefined();
      expect(project.link).toBeUndefined();
    });
  });

  describe('Timestamps', () => {
    it('should define createdAt and updatedAt in schema', () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'My Awesome Project',
        description: 'This is a description of my awesome project',
        documentation: 'Project documentation here',
      });

      // Timestamps are set by Mongoose when saving to database
      // Here we verify the schema has timestamps enabled
      expect(project.schema.options.timestamps).toBe(true);
    });
  });
});
