import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Globe, ShoppingCart, FileText, ChevronRight, ExternalLink } from "lucide-react";
import { formatTimeAgo, getStatusColor, getStatusDot } from "@/lib/utils";
import type { Project } from "@shared/schema";

const projectIcons = {
  "my-portfolio": Globe,
  "e-commerce-app": ShoppingCart,
  "company-blog": FileText,
};

export function RecentProjects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <Card className="deploy-card">
        <CardHeader>
          <CardTitle className="text-xl">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                    <div>
                      <div className="w-24 h-4 bg-gray-700 rounded mb-2" />
                      <div className="w-32 h-3 bg-gray-700 rounded" />
                    </div>
                  </div>
                  <div className="w-16 h-4 bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="deploy-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Recent Projects</CardTitle>
          <Button variant="ghost" size="sm">
            <ExternalLink size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects?.map((project) => {
            const IconComponent = projectIcons[project.name as keyof typeof projectIcons] || Globe;
            
            return (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800/50 deploy-card-hover"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 deploy-gradient rounded-lg flex items-center justify-center">
                    <IconComponent className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-gray-400 flex items-center space-x-2">
                      <span>{project.domain}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span>{formatTimeAgo(project.lastDeployment || project.createdAt!)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusDot(project.status)}`} />
                    <span className={`text-sm capitalize ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
