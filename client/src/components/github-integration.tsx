import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Github } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import type { Repository } from "@shared/schema";

export function GitHubIntegration() {
  const { data: repositories, isLoading } = useQuery<Repository[]>({
    queryKey: ["/api/repositories"],
  });

  return (
    <div className="mt-8">
      <Card className="deploy-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">GitHub Integration</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Github size={16} className="mr-2" />
              Connect Repository
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-black/50 border border-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-700 rounded" />
                        <div className="w-32 h-4 bg-gray-700 rounded" />
                      </div>
                      <div className="w-2 h-2 bg-gray-700 rounded-full" />
                    </div>
                    <div className="w-48 h-3 bg-gray-700 rounded mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-3 bg-gray-700 rounded" />
                      <div className="w-20 h-3 bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              repositories?.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-black/50 border border-gray-800/50 rounded-lg p-4 deploy-card-hover"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Github className="text-gray-400" size={16} />
                      <span className="font-medium">{repo.fullName}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      repo.isConnected ? "bg-green-400" : "bg-yellow-400"
                    }`} />
                  </div>
                  <div className="text-sm text-gray-400 mb-3">
                    {repo.description}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{repo.language}</span>
                    <span>{formatTimeAgo(repo.lastUpdated!)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
