/**
 * @jest-environment node
 */
import { addProjects, updateProject, deleteProject } from '../action';
import { Project } from '../models';
import mongoose from 'mongoose';

const TEST_DB_URL = process.env.MONGO_URL;

describe('Project Server Actions', () => {
  beforeAll(async () => {
    if (TEST_DB_URL) {
      try {
        await mongoose.connect(TEST_DB_URL);
      } catch {
        console.warn('MongoDB not available, skipping database tests');
      }
    }
  });

  beforeEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await Project.deleteMany({});
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
  });

  describe('addProjects', () => {
    it.skip('should add a valid project', async () => {
      const projectData = {
        studentMatric: 'ABC123456',
        title: 'Test Project',
        description: 'This is a test project description',
        documentation: 'Project documentation',
        link: 'https://github.com/test/project',
      };

      const result = await addProjects(projectData);

      expect(result).toBeDefined();
      expect(result.title).toBe('Test Project');
      expect(result.studentMatric).toBe('ABC123456');
    });

    it.skip('should fail without required fields', async () => {
      const projectData = {
        studentMatric: 'ABC123456',
        title: 'Test',
        // Missing description and documentation
      };

      await expect(addProjects(projectData as unknown as typeof projectData)).rejects.toThrow();
    });
  });

  describe('updateProject', () => {
    it.skip('should update an existing project', async () => {
      // Create a project first
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'Original Title',
        description: 'Original description',
        documentation: 'Original documentation',
      });
      await project.save();

      const updateData = {
        title: 'Updated Title',
        description: 'Updated description',
      };

      const result = await updateProject(project._id.toString(), updateData);

      expect(result).toBeDefined();
      expect(result.title).toBe('Updated Title');
      expect(result.description).toBe('Updated description');
    });

    it.skip('should throw error for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      
      await expect(updateProject(fakeId, { title: 'Test' })).rejects.toThrow('Project not found');
    });
  });

  describe('deleteProject', () => {
    it.skip('should delete an existing project', async () => {
      const project = new Project({
        studentMatric: 'ABC123456',
        title: 'Test Project',
        description: 'Test description',
        documentation: 'Test documentation',
      });
      await project.save();

      const result = await deleteProject(project._id.toString());

      expect(result).toEqual({ success: true, message: 'Project deleted successfully' });
      
      // Verify deletion
      const deletedProject = await Project.findById(project._id);
      expect(deletedProject).toBeNull();
    });

    it.skip('should throw error for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      
      await expect(deleteProject(fakeId)).rejects.toThrow('Project not found');
    });
  });
});
