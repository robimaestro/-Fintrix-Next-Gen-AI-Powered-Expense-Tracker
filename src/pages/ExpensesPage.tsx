
import React from 'react';
import ExpensesChart from '@/components/expenses/ExpensesChart';
import CategoryBreakdown from '@/components/expenses/CategoryBreakdown';
import TransactionList from '@/components/expenses/TransactionList';
import { getTotalExpenses } from '@/lib/expenseUtils';

const ExpensesPage: React.FC = () => {
  const totalExpenses = getTotalExpenses();
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-black/30 rounded-xl p-6 mb-6 border border-white/10">
        <h1 className="text-2xl font-bold mb-3 text-finance-chart">Welcome to Fintrix</h1>
        <p className="text-finance-gray">
          Welcome to Fintrix – the next-gen AI-powered expense tracker. Analyze your finances, get smart summaries, and make better decisions — no coding or spreadsheets required.
        </p>
      </div>
      
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
