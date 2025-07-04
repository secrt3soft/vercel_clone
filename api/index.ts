import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertProjectSchema, insertDomainSchema, insertRepositorySchema } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { pathname } = new URL(req.url!, `http://${req.headers.host}`);
  const apiPath = pathname.replace('/api', '');
  
  try {
    // Projects routes
    if (apiPath === '/projects' && req.method === 'GET') {
      const projects = await storage.getProjects();
      return res.json(projects);
    }

    if (apiPath.startsWith('/projects/') && req.method === 'GET') {
      const id = parseInt(apiPath.split('/')[2]);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.json(project);
    }

    if (apiPath === '/projects' && req.method === 'POST') {
      const result = insertProjectSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid project data", errors: result.error.issues });
      }
      const project = await storage.createProject(result.data);
      return res.status(201).json(project);
    }

    // Repositories routes
    if (apiPath === '/repositories' && req.method === 'GET') {
      const repositories = await storage.getRepositories();
      return res.json(repositories);
    }

    if (apiPath === '/repositories' && req.method === 'POST') {
      const result = insertRepositorySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid repository data", errors: result.error.issues });
      }
      const repository = await storage.createRepository(result.data);
      return res.status(201).json(repository);
    }

    // Domains routes
    if (apiPath === '/domains' && req.method === 'GET') {
      const domains = await storage.getDomains();
      return res.json(domains);
    }

    if (apiPath === '/domains' && req.method === 'POST') {
      const result = insertDomainSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid domain data", errors: result.error.issues });
      }
      const domain = await storage.createDomain(result.data);
      return res.status(201).json(domain);
    }

    // Activities routes
    if (apiPath === '/activities' && req.method === 'GET') {
      const activities = await storage.getActivities();
      return res.json(activities);
    }

    // Deployments routes
    if (apiPath === '/deployments' && req.method === 'GET') {
      const deployments = await storage.getDeployments();
      return res.json(deployments);
    }

    if (apiPath.startsWith('/deployments/') && req.method === 'POST') {
      const projectId = parseInt(apiPath.split('/')[2]);
      const deployment = await storage.createDeployment({
        projectId,
        status: "pending",
        commitHash: "abc123",
        branch: "main",
        buildTime: null,
      });
      
      // Simulate deployment process
      setTimeout(async () => {
        await storage.updateDeployment(deployment.id, { status: "building" });
        await storage.createActivity({
          projectId,
          type: "deployment",
          message: "Deployment started",
          status: "info",
        });
      }, 1000);

      setTimeout(async () => {
        await storage.updateDeployment(deployment.id, { status: "success", buildTime: 45 });
        await storage.updateProject(projectId, { 
          status: "ready"
        });
        await storage.createActivity({
          projectId,
          type: "deployment",
          message: "Deployment completed successfully",
          status: "success",
        });
      }, 10000);

      return res.status(201).json(deployment);
    }

    return res.status(404).json({ message: 'API route not found' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}