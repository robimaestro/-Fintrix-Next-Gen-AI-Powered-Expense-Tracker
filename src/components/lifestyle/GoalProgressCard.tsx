
import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GoalProgressCardProps {
  title: string;
  progress: number;
  message: string;
  icon: ReactNode;
  color: string;
}

const GoalProgressCard: React.FC<GoalProgressCardProps> = ({ title, progress, message, icon, color }) => {
  const colorMap: Record<string, string> = {
    'blue': 'from-blue-500 to-blue-700',
    'green': 'from-green-500 to-green-700',
    'red': 'from-red-500 to-red-700',
    'purple': 'from-purple-500 to-purple-700',
    'orange': 'from-orange-500 to-orange-700'
  };
  
  const gradientClass = colorMap[color] || 'from-finance-chart to-finance-accent';
  
  return (
    <Card className="border-white/10 bg-black/30">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-finance-gray">{message}</p>
          </div>
          <div className="p-3 bg-black/30 rounded-full">
            {icon}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-white/10" 
            indicatorClassName={`bg-gradient-to-r ${gradientClass}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgressCard;
