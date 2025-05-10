
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Dumbbell, Star } from 'lucide-react';

interface SmartSuggestionProps {
  title: string;
  description: string;
  category: 'rest' | 'diet' | 'fitness' | 'consistency';
}

const SmartSuggestion: React.FC<SmartSuggestionProps> = ({ title, description, category }) => {
  const categoryConfig = {
    'rest': {
      icon: <Heart className="h-5 w-5 text-pink-400" />,
      bgColor: 'bg-pink-500/20',
    },
    'diet': {
      icon: <Star className="h-5 w-5 text-green-400" />,
      bgColor: 'bg-green-500/20',
    },
    'fitness': {
      icon: <Dumbbell className="h-5 w-5 text-blue-400" />,
      bgColor: 'bg-blue-500/20',
    },
    'consistency': {
      icon: <Star className="h-5 w-5 text-amber-400" />,
      bgColor: 'bg-amber-500/20',
    },
  }[category];

  return (
    <Card className="border-white/10 bg-black/30">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className={`p-2 ${categoryConfig.bgColor} rounded-full h-fit`}>
            {categoryConfig.icon}
          </div>
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-finance-gray">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestion;
