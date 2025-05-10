
import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineEventProps {
  title: string;
  time: string;
  description: string;
  icon: ReactNode;
  category: 'workout' | 'recovery' | 'competition' | 'habit';
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  title, 
  time, 
  description, 
  icon,
  category
}) => {
  const categoryStyles = {
    'workout': 'border-l-red-500',
    'recovery': 'border-l-green-500',
    'competition': 'border-l-amber-500',
    'habit': 'border-l-blue-500'
  }[category];

  const categoryBadgeStyles = {
    'workout': 'bg-red-500/20 text-red-400 border-red-500/30',
    'recovery': 'bg-green-500/20 text-green-400 border-green-500/30',
    'competition': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'habit': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }[category];

  return (
    <Card className={`border-white/10 bg-black/30 border-l-4 ${categoryStyles}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="text-white">
              {icon}
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-xs text-finance-gray">{time}</p>
            </div>
          </div>
          <Badge className={categoryBadgeStyles}>
            {category}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-finance-gray">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TimelineEvent;
