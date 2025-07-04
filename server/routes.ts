import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertDomainSchema, insertRepositorySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid project data", errors: result.error.issues });
      }
      
      const project = await storage.createProject(result.data);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Repositories
  app.get("/api/repositories", async (req, res) => {
    try {
      const repositories = await storage.getRepositories();
      res.json(repositories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repositories" });
    }
  });

  app.post("/api/repositories", async (req, res) => {
    try {
      const result = insertRepositorySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid repository data", errors: result.error.issues });
      }
      
      const repository = await storage.createRepository(result.data);
      res.status(201).json(repository);
    } catch (error) {
      res.status(500).json({ message: "Failed to create repository" });
    }
  });

  // Domains
  app.get("/api/domains", async (req, res) => {
    try {
      const domains = await storage.getDomains();
      res.json(domains);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch domains" });
    }
  });

  app.post("/api/domains", async (req, res) => {
    try {
      const result = insertDomainSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid domain data", errors: result.error.issues });
      }
      
      const domain = await storage.createDomain(result.data);
      res.status(201).json(domain);
    } catch (error) {
      res.status(500).json({ message: "Failed to create domain" });
    }
  });

  // Activities
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Deployments
  app.get("/api/deployments", async (req, res) => {
    try {
      const deployments = await storage.getDeployments();
      res.json(deployments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch deployments" });
    }
  });

  app.post("/api/deployments/:projectId", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
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

      res.status(201).json(deployment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create deployment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
