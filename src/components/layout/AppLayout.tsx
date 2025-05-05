
import React, { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, MessageSquare } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-finance-dark">
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      <nav className="bg-black/40 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="container mx-auto flex justify-center gap-16">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `flex flex-col items-center gap-1 ${isActive ? 'text-finance-chart' : 'text-finance-gray'} hover:text-finance-chart transition-colors`
            }
          >
            <PieChart className="h-6 w-6" />
            <span className="text-xs">Expenses</span>
          </NavLink>
          <NavLink 
            to="/assistant" 
            className={({isActive}) => 
              `flex flex-col items-center gap-1 ${isActive ? 'text-finance-chart' : 'text-finance-gray'} hover:text-finance-chart transition-colors`
            }
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs">Assistant</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
