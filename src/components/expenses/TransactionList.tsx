
import React from 'react';
import { formatDate, expenses, getCategoryIcon } from '@/lib/expenseUtils';

const TransactionList: React.FC = () => {
  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
      </div>
      <div className="max-h-[400px] overflow-y-auto scrollbar-none">
        {sortedExpenses.map((expense, index) => (
          <div 
            key={index} 
            className="p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center category-icon text-xl">
                  {getCategoryIcon(expense.category)}
                </div>
                <div>
                  <p className="font-medium capitalize">{expense.category}</p>
                  <p className="text-sm text-finance-gray">{formatDate(expense.date)} • {expense.timeStamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-finance-chart">{expense.currency}{expense.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
