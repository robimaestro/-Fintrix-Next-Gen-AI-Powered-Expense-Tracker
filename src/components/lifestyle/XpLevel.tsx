
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface XpLevelProps {
  level: number;
  xp: number;
  nextLevelXp: number;
}

const XpLevel: React.FC<XpLevelProps> = ({ level, xp, nextLevelXp }) => {
  const progress = Math.round((xp / nextLevelXp) * 100);
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1">
          <span className="text-sm text-finance-gray">Level</span>
          <span className="text-xl font-bold text-finance-chart">{level}</span>
        </div>
        <div className="text-xs text-finance-gray">
          {xp} / {nextLevelXp} XP
        </div>
      </div>
      <div className="bg-gradient-to-r from-finance-chart to-finance-accent h-12 w-12 rounded-full flex items-center justify-center text-white font-bold border-2 border-white/20">
        {level}
      </div>
    </div>
  );
};

export default XpLevel;
