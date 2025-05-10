
import React from 'react';
import ExpensesChart from '@/components/expenses/ExpensesChart';
import CategoryBreakdown from '@/components/expenses/CategoryBreakdown';
import TransactionList from '@/components/expenses/TransactionList';
import SpendingSummary from '@/components/expenses/SpendingSummary';
import { getTotalExpenses } from '@/lib/expenseUtils';
import { Heart, X } from 'lucide-react';
import { useState } from 'react';

const ExpensesPage: React.FC = () => {
  const totalExpenses = getTotalExpenses();
  const [showWelcome, setShowWelcome] = useState(true);
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {showWelcome && (
        <div className="bg-black/30 rounded-xl p-6 mb-6 border border-white/10 relative">
          <button 
            onClick={() => setShowWelcome(false)} 
            className="absolute top-4 right-4 text-finance-gray hover:text-white transition-colors"
            aria-label="Close welcome message"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <Heart size={20} className="text-finance-chart" />
            <h1 className="text-2xl font-bold text-finance-chart">Welcome to Fintrix — your AI-powered companion for money and well-being</h1>
          </div>
          <p className="text-finance-gray">
            Stay on top of your expenses, follow your investments, and optimize your health — all in one place.
          </p>
        </div>
      )}
      
      <SpendingSummary />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Total Spending</h1>
        <div className="text-4xl md:text-5xl font-bold text-finance-chart animate-pulse-glow">
          ${totalExpenses}
        </div>
      </div>
      
      <div className="mb-6">
        <CategoryBreakdown />
      </div>
      
      <div className="mb-6">
        <ExpensesChart />
      </div>
      
      <div>
        <TransactionList />
      </div>
    </div>
  );
};

export default ExpensesPage;
