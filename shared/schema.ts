import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  domain: text("domain").notNull(),
  repository: text("repository"),
  status: text("status").notNull().default("ready"), // ready, building, error
  lastDeployment: timestamp("last_deployment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const deployments = pgTable("deployments", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  status: text("status").notNull().default("pending"), // pending, building, success, error
  commitHash: text("commit_hash"),
  branch: text("branch").default("main"),
  buildTime: integer("build_time"), // in seconds
  createdAt: timestamp("created_at").defaultNow(),
});

export const domains = pgTable("domains", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  domain: text("domain").notNull(),
  isCustom: boolean("is_custom").default(false),
  sslStatus: text("ssl_status").notNull().default("pending"), // pending, active, error
  status: text("status").notNull().default("configuring"), // configuring, active, error
  createdAt: timestamp("created_at").defaultNow(),
});

export const repositories = pgTable("repositories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  description: text("description"),
  language: text("language"),
  lastUpdated: timestamp("last_updated"),
  isConnected: boolean("is_connected").default(false),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id"),
  type: text("type").notNull(), // deployment, domain, repository
  message: text("message").notNull(),
  status: text("status").notNull(), // success, warning, error, info
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  lastDeployment: true,
});

export const insertDeploymentSchema = createInsertSchema(deployments).omit({
  id: true,
  createdAt: true,
});

export const insertDomainSchema = createInsertSchema(domains).omit({
  id: true,
  createdAt: true,
});

export const insertRepositorySchema = createInsertSchema(repositories).omit({
  id: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Deployment = typeof deployments.$inferSelect;
export type InsertDeployment = z.infer<typeof insertDeploymentSchema>;
export type Domain = typeof domains.$inferSelect;
export type InsertDomain = z.infer<typeof insertDomainSchema>;
export type Repository = typeof repositories.$inferSelect;
export type InsertRepository = z.infer<typeof insertRepositorySchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
