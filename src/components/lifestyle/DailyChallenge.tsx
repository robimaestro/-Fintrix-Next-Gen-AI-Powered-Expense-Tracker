
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Trophy, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DailyChallengeProps {
  title: string;
  description: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  deadline: string;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ 
  title, 
  description, 
  reward, 
  difficulty,
  deadline
}) => {
  const difficultyColor = {
    'easy': 'bg-green-500/20 text-green-400 border-green-500/30',
    'medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'hard': 'bg-red-500/20 text-red-400 border-red-500/30'
  }[difficulty];

  return (
    <Card className="overflow-hidden border-white/10 bg-black/30">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-finance-chart" />
            <h3 className="font-bold">{title}</h3>
          </div>
          <Badge className={`${difficultyColor}`}>
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-finance-gray mb-2">{description}</p>
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center text-finance-chart">
            <Trophy className="mr-1 h-4 w-4" />
            {reward}
          </div>
          <div className="flex items-center text-finance-gray">
            <Clock className="mr-1 h-4 w-4" />
            {deadline}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-finance-accent/10 px-4 py-2">
        <Button variant="ghost" className="w-full text-finance-accent hover:bg-finance-accent/20 hover:text-white">
          Accept Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
