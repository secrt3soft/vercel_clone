import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Rocket, Plus, User } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 deploy-gradient rounded-lg flex items-center justify-center">
                <Rocket className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold">Deploy</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                Overview
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Integrations
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Settings
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus size={16} className="mr-2" />
              New Project
            </Button>
            <Avatar className="w-8 h-8 bg-gray-800">
              <AvatarFallback>
                <User size={16} className="text-gray-400" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
