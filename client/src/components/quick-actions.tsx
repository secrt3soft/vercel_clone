import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, FileText, Upload, Settings } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="deploy-card deploy-card-hover cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Github className="text-blue-400" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">Import Git Repository</div>
              <div className="text-sm text-gray-400">Connect your GitHub repo</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="deploy-card deploy-card-hover cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <FileText className="text-purple-400" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">Deploy Template</div>
              <div className="text-sm text-gray-400">Start from a template</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="deploy-card deploy-card-hover cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Upload className="text-green-400" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">Upload Files</div>
              <div className="text-sm text-gray-400">Drag and drop files</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="deploy-card deploy-card-hover cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Settings className="text-orange-400" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">Configure Project</div>
              <div className="text-sm text-gray-400">Set up build settings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
