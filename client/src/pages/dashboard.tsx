import { Navigation } from "@/components/navigation";
import { QuickActions } from "@/components/quick-actions";
import { RecentProjects } from "@/components/recent-projects";
import { DeploymentActivity } from "@/components/deployment-activity";
import { DeploymentPipeline } from "@/components/deployment-pipeline";
import { GitHubIntegration } from "@/components/github-integration";
import { DomainManagement } from "@/components/domain-management";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-blue-400">Alex</span>
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Projects and Deployments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentProjects />
          </div>
          <div className="space-y-6">
            <DeploymentActivity />
          </div>
        </div>

        {/* Deployment Pipeline */}
        <DeploymentPipeline />

        {/* GitHub Integration */}
        <GitHubIntegration />

        {/* Domain Management */}
        <DomainManagement />
      </main>
    </div>
  );
}
