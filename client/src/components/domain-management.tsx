import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Globe, Link, Plus, ExternalLink, Settings } from "lucide-react";
import type { Domain } from "@shared/schema";

export function DomainManagement() {
  const { data: domains, isLoading } = useQuery<Domain[]>({
    queryKey: ["/api/domains"],
  });

  return (
    <div className="mt-8">
      <Card className="deploy-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Domain Management</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Domain
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                      <div>
                        <div className="w-48 h-4 bg-gray-700 rounded mb-2" />
                        <div className="w-32 h-3 bg-gray-700 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-6 bg-gray-700 rounded" />
                      <div className="w-4 h-4 bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              domains?.map((domain) => (
                <div
                  key={domain.id}
                  className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      domain.status === "active" 
                        ? "bg-green-400/20" 
                        : "bg-blue-400/20"
                    }`}>
                      {domain.isCustom ? (
                        <Link className={domain.status === "active" ? "text-green-400" : "text-blue-400"} size={20} />
                      ) : (
                        <Globe className={domain.status === "active" ? "text-green-400" : "text-blue-400"} size={20} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium font-mono">{domain.domain}</div>
                      <div className="text-sm text-gray-400">
                        {domain.isCustom ? "Custom domain" : "Default domain"} • SSL {domain.sslStatus}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={domain.status === "active" ? "default" : "secondary"}
                      className={`${
                        domain.status === "active" 
                          ? "bg-green-400/20 text-green-400 hover:bg-green-400/30" 
                          : "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30"
                      }`}
                    >
                      {domain.status === "active" ? "Active" : "Configuring"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      {domain.status === "active" ? (
                        <ExternalLink size={16} />
                      ) : (
                        <Settings size={16} />
                      )}
                    </Button>
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
