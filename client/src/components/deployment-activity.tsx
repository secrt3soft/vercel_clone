import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Eye, Users, Clock } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import type { Activity } from "@shared/schema";

export function DeploymentActivity() {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  return (
    <>
      {/* Activity Feed */}
      <Card className="deploy-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="w-48 h-4 bg-gray-700 rounded mb-1" />
                      <div className="w-16 h-3 bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              activities?.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-400' :
                    activity.status === 'error' ? 'bg-red-400' : 'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm">{activity.message}</div>
                    <div className="text-xs text-gray-400">
                      {formatTimeAgo(activity.createdAt!)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <Card className="deploy-card">
        <CardHeader>
          <CardTitle className="text-lg">Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="text-blue-400" size={16} />
                <span className="text-sm">Page Views</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">24,891</div>
                <div className="text-xs text-green-400">+12%</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="text-purple-400" size={16} />
                <span className="text-sm">Unique Visitors</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">8,467</div>
                <div className="text-xs text-green-400">+8%</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="text-green-400" size={16} />
                <span className="text-sm">Avg. Load Time</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">1.2s</div>
                <div className="text-xs text-green-400">-0.3s</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
