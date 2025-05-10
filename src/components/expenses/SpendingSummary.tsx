
import React from 'react';
import { getCategoryExpenses, expenses } from '@/lib/expenseUtils';
import { format } from 'date-fns';

const SpendingSummary = () => {
  const categoryExpenses = getCategoryExpenses();
  const topCategories = categoryExpenses.slice(0, 2);
  const totalSpent = categoryExpenses.reduce((acc, cat) => acc + cat.amount, 0);
  
  // Get the current month name
  const currentMonth = format(new Date(), 'MMMM');
  
  // Get the most recent transaction date
  const mostRecentDate = new Date(Math.max(...expenses.map(e => new Date(e.date).getTime())));
  const lastTransactionDate = format(mostRecentDate, 'MMM d');
  
  // Determine spending trend
  const thisMonthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === new Date().getMonth() && 
           expDate.getFullYear() === new Date().getFullYear();
  });
  
  const thisMonthTotal = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  // Generate different message variations based on data
  let summaryMessage = '';
  const emoji = getRandomEmoji();

  if (topCategories.length > 0) {
    summaryMessage = `${emoji} This ${currentMonth}, you've spent $${totalSpent} with most going to ${topCategories[0].category} (${topCategories[0].percentage}%) and ${topCategories[1]?.category || 'other categories'} (${topCategories[1]?.percentage || 0}%). Your last transaction was on ${lastTransactionDate}.`;
  } else {
    summaryMessage = `${emoji} Welcome to your financial dashboard! Start tracking your expenses to see personalized insights here.`;
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
      <p className="text-lg font-medium text-white">{summaryMessage}</p>
    </div>
  );
};

// Function to get random emoji for variety
const getRandomEmoji = () => {
  const emojis = ['✨', '💫', '🔮', '📊', '💰', '💸', '📈', '🧠'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export default SpendingSummary;
