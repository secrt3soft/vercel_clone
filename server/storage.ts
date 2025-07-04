import { 
  projects, 
  deployments, 
  domains, 
  repositories, 
  activities,
  type Project, 
  type InsertProject,
  type Deployment,
  type InsertDeployment,
  type Domain,
  type InsertDomain,
  type Repository,
  type InsertRepository,
  type Activity,
  type InsertActivity
} from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Deployments
  getDeployments(): Promise<Deployment[]>;
  getDeploymentsByProject(projectId: number): Promise<Deployment[]>;
  createDeployment(deployment: InsertDeployment): Promise<Deployment>;
  updateDeployment(id: number, deployment: Partial<InsertDeployment>): Promise<Deployment | undefined>;

  // Domains
  getDomains(): Promise<Domain[]>;
  getDomainsByProject(projectId: number): Promise<Domain[]>;
  createDomain(domain: InsertDomain): Promise<Domain>;
  updateDomain(id: number, domain: Partial<InsertDomain>): Promise<Domain | undefined>;
  deleteDomain(id: number): Promise<boolean>;

  // Repositories
  getRepositories(): Promise<Repository[]>;
  createRepository(repository: InsertRepository): Promise<Repository>;
  updateRepository(id: number, repository: Partial<InsertRepository>): Promise<Repository | undefined>;

  // Activities
  getActivities(): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project> = new Map();
  private deployments: Map<number, Deployment> = new Map();
  private domains: Map<number, Domain> = new Map();
  private repositories: Map<number, Repository> = new Map();
  private activities: Map<number, Activity> = new Map();
  private currentProjectId = 1;
  private currentDeploymentId = 1;
  private currentDomainId = 1;
  private currentRepositoryId = 1;
  private currentActivityId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed projects
    const project1: Project = {
      id: this.currentProjectId++,
      name: "my-portfolio",
      description: "Personal portfolio website",
      domain: "portfolio-site.vercel.app",
      repository: "github.com/username/portfolio",
      status: "ready",
      lastDeployment: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    };

    const project2: Project = {
      id: this.currentProjectId++,
      name: "e-commerce-app",
      description: "E-commerce platform with payment integration",
      domain: "shop.example.com",
      repository: "github.com/company/ecommerce",
      status: "building",
      lastDeployment: new Date(Date.now() - 5 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    };

    const project3: Project = {
      id: this.currentProjectId++,
      name: "company-blog",
      description: "Content management system for company blog",
      domain: "blog.company.com",
      repository: "github.com/team/blog-cms",
      status: "ready",
      lastDeployment: new Date(Date.now() - 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    };

    this.projects.set(project1.id, project1);
    this.projects.set(project2.id, project2);
    this.projects.set(project3.id, project3);

    // Seed repositories
    const repo1: Repository = {
      id: this.currentRepositoryId++,
      name: "portfolio",
      fullName: "username/portfolio",
      description: "Personal portfolio website built with React and Tailwind CSS",
      language: "TypeScript",
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isConnected: true,
    };

    const repo2: Repository = {
      id: this.currentRepositoryId++,
      name: "ecommerce",
      fullName: "company/ecommerce",
      description: "E-commerce platform with payment integration",
      language: "JavaScript",
      lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isConnected: true,
    };

    const repo3: Repository = {
      id: this.currentRepositoryId++,
      name: "blog-cms",
      fullName: "team/blog-cms",
      description: "Content management system for company blog",
      language: "Next.js",
      lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isConnected: true,
    };

    this.repositories.set(repo1.id, repo1);
    this.repositories.set(repo2.id, repo2);
    this.repositories.set(repo3.id, repo3);

    // Seed domains
    const domain1: Domain = {
      id: this.currentDomainId++,
      projectId: project1.id,
      domain: "portfolio-site.vercel.app",
      isCustom: false,
      sslStatus: "active",
      status: "active",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    };

    const domain2: Domain = {
      id: this.currentDomainId++,
      projectId: project1.id,
      domain: "www.myportfolio.com",
      isCustom: true,
      sslStatus: "pending",
      status: "configuring",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    };

    this.domains.set(domain1.id, domain1);
    this.domains.set(domain2.id, domain2);

    // Seed activities
    const activity1: Activity = {
      id: this.currentActivityId++,
      projectId: project1.id,
      type: "deployment",
      message: "my-portfolio deployed successfully",
      status: "success",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    };

    const activity2: Activity = {
      id: this.currentActivityId++,
      projectId: project2.id,
      type: "deployment",
      message: "e-commerce-app build started",
      status: "warning",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    };

    const activity3: Activity = {
      id: this.currentActivityId++,
      projectId: project1.id,
      type: "domain",
      message: "New domain shop.example.com added",
      status: "info",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    };

    this.activities.set(activity1.id, activity1);
    this.activities.set(activity2.id, activity2);
    this.activities.set(activity3.id, activity3);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      id: this.currentProjectId++,
      name: project.name,
      description: project.description ?? null,
      domain: project.domain,
      repository: project.repository ?? null,
      status: project.status ?? "ready",
      createdAt: new Date(),
      lastDeployment: null,
    };
    this.projects.set(newProject.id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...project };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getDeployments(): Promise<Deployment[]> {
    return Array.from(this.deployments.values());
  }

  async getDeploymentsByProject(projectId: number): Promise<Deployment[]> {
    return Array.from(this.deployments.values()).filter(d => d.projectId === projectId);
  }

  async createDeployment(deployment: InsertDeployment): Promise<Deployment> {
    const newDeployment: Deployment = {
      id: this.currentDeploymentId++,
      projectId: deployment.projectId,
      status: deployment.status ?? "pending",
      commitHash: deployment.commitHash ?? null,
      branch: deployment.branch ?? null,
      buildTime: deployment.buildTime ?? null,
      createdAt: new Date(),
    };
    this.deployments.set(newDeployment.id, newDeployment);
    return newDeployment;
  }

  async updateDeployment(id: number, deployment: Partial<InsertDeployment>): Promise<Deployment | undefined> {
    const existing = this.deployments.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...deployment };
    this.deployments.set(id, updated);
    return updated;
  }

  async getDomains(): Promise<Domain[]> {
    return Array.from(this.domains.values());
  }

  async getDomainsByProject(projectId: number): Promise<Domain[]> {
    return Array.from(this.domains.values()).filter(d => d.projectId === projectId);
  }

  async createDomain(domain: InsertDomain): Promise<Domain> {
    const newDomain: Domain = {
      id: this.currentDomainId++,
      projectId: domain.projectId,
      domain: domain.domain,
      isCustom: domain.isCustom ?? false,
      sslStatus: domain.sslStatus ?? "pending",
      status: domain.status ?? "configuring",
      createdAt: new Date(),
    };
    this.domains.set(newDomain.id, newDomain);
    return newDomain;
  }

  async updateDomain(id: number, domain: Partial<InsertDomain>): Promise<Domain | undefined> {
    const existing = this.domains.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...domain };
    this.domains.set(id, updated);
    return updated;
  }

  async deleteDomain(id: number): Promise<boolean> {
    return this.domains.delete(id);
  }

  async getRepositories(): Promise<Repository[]> {
    return Array.from(this.repositories.values());
  }

  async createRepository(repository: InsertRepository): Promise<Repository> {
    const newRepository: Repository = {
      id: this.currentRepositoryId++,
      name: repository.name,
      fullName: repository.fullName,
      description: repository.description ?? null,
      language: repository.language ?? null,
      lastUpdated: repository.lastUpdated ?? null,
      isConnected: repository.isConnected ?? false,
    };
    this.repositories.set(newRepository.id, newRepository);
    return newRepository;
  }

  async updateRepository(id: number, repository: Partial<InsertRepository>): Promise<Repository | undefined> {
    const existing = this.repositories.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...repository };
    this.repositories.set(id, updated);
    return updated;
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const newActivity: Activity = {
      id: this.currentActivityId++,
      projectId: activity.projectId ?? null,
      type: activity.type,
      message: activity.message,
      status: activity.status,
      createdAt: new Date(),
    };
    this.activities.set(newActivity.id, newActivity);
    return newActivity;
  }
}

export const storage = new MemStorage();
