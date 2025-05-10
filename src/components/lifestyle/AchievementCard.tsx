
import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  xpEarned: number;
  icon: ReactNode;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, xpEarned, icon }) => {
  return (
    <Card className="border-white/10 bg-black/30 overflow-hidden">
      <div className="bg-gradient-to-br from-finance-accent to-finance-chart h-2"></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="p-2 bg-finance-accent/20 rounded-full">
            {React.cloneElement(icon as React.ReactElement, { 
              className: "h-6 w-6 text-finance-accent" 
            })}
          </div>
          <span className="flex items-center text-xs bg-finance-accent/20 text-finance-accent px-2 py-1 rounded-full">
            <Star className="h-3 w-3 mr-1" />
            {xpEarned} XP
          </span>
        </div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-finance-gray">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
