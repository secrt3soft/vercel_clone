import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Clock, RefreshCw } from "lucide-react";

export function DeploymentPipeline() {
  const pipelineSteps = [
    {
      id: 1,
      title: "Source Code",
      description: "Repository cloned from GitHub",
      status: "completed",
      duration: "2.3s",
    },
    {
      id: 2,
      title: "Build Process",
      description: "Dependencies installed and project built",
      status: "completed",
      duration: "45.7s",
    },
    {
      id: 3,
      title: "Deployment",
      description: "Uploading build artifacts to CDN",
      status: "in-progress",
      duration: "In progress...",
    },
    {
      id: 4,
      title: "Domain Assignment",
      description: "Assign custom domain and SSL certificate",
      status: "pending",
      duration: "Pending",
    },
  ];

  return (
    <div className="mt-8">
      <Card className="deploy-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Deployment Pipeline</CardTitle>
            <Button variant="ghost" size="sm">
              <RefreshCw size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-4 p-4 bg-black/50 rounded-lg border ${
                  step.status === "in-progress" 
                    ? "border-yellow-500/20" 
                    : "border-gray-800/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === "completed" 
                    ? "bg-green-400" 
                    : step.status === "in-progress" 
                    ? "bg-yellow-400" 
                    : "bg-gray-700"
                }`}>
                  {step.status === "completed" ? (
                    <Check className="text-white" size={16} />
                  ) : step.status === "in-progress" ? (
                    <Loader2 className="text-white animate-spin" size={16} />
                  ) : (
                    <Clock className="text-gray-400" size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${step.status === "pending" ? "text-gray-400" : ""}`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-400">{step.description}</div>
                </div>
                <div className={`text-sm ${
                  step.status === "completed" 
                    ? "text-gray-400" 
                    : step.status === "in-progress" 
                    ? "text-yellow-400" 
                    : "text-gray-400"
                }`}>
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
