
import { format, parse } from 'date-fns';

export interface Expense {
  date: string;
  category: string;
  amount: number;
  timeStamp: string;
  currency: string;
}

export const expenses: Expense[] = [
  // --- 2024 MOCK DATA ---
  { date: '2024-10-10', category: 'food', amount: 12, timeStamp: '12:15PM', currency: '$' },
  { date: '2024-10-12', category: 'transport', amount: 22, timeStamp: '07:45AM', currency: '$' },
  { date: '2024-10-28', category: 'groceries', amount: 85, timeStamp: '05:30PM', currency: '$' },
  { date: '2024-11-05', category: 'entertainment', amount: 40, timeStamp: '08:00PM', currency: '$' },
  { date: '2024-11-11', category: 'food', amount: 18, timeStamp: '01:30PM', currency: '$' },
  { date: '2024-11-23', category: 'subscriptions', amount: 12, timeStamp: '10:00AM', currency: '$' },
  { date: '2024-12-01', category: 'utilities', amount: 90, timeStamp: '03:20PM', currency: '$' },
  { date: '2024-12-17', category: 'groceries', amount: 130, timeStamp: '06:45PM', currency: '$' },
  { date: '2024-12-21', category: 'transport', amount: 55, timeStamp: '09:00AM', currency: '$' },
  { date: '2024-12-29', category: 'gifts', amount: 75, timeStamp: '04:50PM', currency: '$' },

  // --- 2025 MOCK DATA ---
  { date: '2025-01-05', category: 'food', amount: 15, timeStamp: '11:00AM', currency: '$' },
  { date: '2025-01-12', category: 'transport', amount: 40, timeStamp: '08:30AM', currency: '$' },
  { date: '2025-01-20', category: 'entertainment', amount: 30, timeStamp: '09:15PM', currency: '$' },
  { date: '2025-01-25', category: 'subscriptions', amount: 10, timeStamp: '08:00AM', currency: '$' },
  { date: '2025-02-03', category: 'groceries', amount: 120, timeStamp: '04:00PM', currency: '$' },
  { date: '2025-02-07', category: 'gifts', amount: 60, timeStamp: '05:15PM', currency: '$' },
  { date: '2025-02-11', category: 'food', amount: 18, timeStamp: '01:00PM', currency: '$' },
  { date: '2025-02-25', category: 'transport', amount: 60, timeStamp: '07:45AM', currency: '$' },
  { date: '2025-03-01', category: 'utilities', amount: 95, timeStamp: '02:30PM', currency: '$' },
  { date: '2025-03-05', category: 'transport', amount: 35, timeStamp: '10:30AM', currency: '$' },
  { date: '2025-03-12', category: 'food', amount: 15, timeStamp: '11:00AM', currency: '$' },
  { date: '2025-03-15', category: 'food', amount: 22, timeStamp: '12:45PM', currency: '$' },
  { date: '2025-03-19', category: 'entertainment', amount: 50, timeStamp: '09:00PM', currency: '$' },
  { date: '2025-03-22', category: 'entertainment', amount: 45, timeStamp: '08:50PM', currency: '$' },
  { date: '2025-03-28', category: 'groceries', amount: 110, timeStamp: '06:15PM', currency: '$' },
];

export type MonthlyExpenses = {
  month: string;
  total: number;
}

export type CategoryExpense = {
  category: string;
  amount: number;
  percentage: number;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy');
};

export const getMonthlyExpenses = (): MonthlyExpenses[] => {
  const monthMap = new Map<string, number>();
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = format(date, 'MMM yyyy');
    
    const currentTotal = monthMap.get(monthYear) || 0;
    monthMap.set(monthYear, currentTotal + expense.amount);
  });
  
  return Array.from(monthMap.entries())
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => {
      const dateA = parse(a.month, 'MMM yyyy', new Date());
      const dateB = parse(b.month, 'MMM yyyy', new Date());
      return dateA.getTime() - dateB.getTime();
    });
};

export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return '🍕';
    case 'transport':
      return '🚗';
    case 'entertainment':
      return '🎮';
    case 'groceries':
      return '🛒';
    case 'utilities':
      return '💡';
    case 'subscriptions':
      return '📱';
    case 'gifts':
      return '🎁';
    default:
      return '💲';
  }
};

export const getTotalExpenses = (): number => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

export const getCategoryExpenses = (): CategoryExpense[] => {
  const categoryMap = new Map<string, number>();
  
  expenses.forEach(expense => {
    const currentTotal = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, currentTotal + expense.amount);
  });
  
  const totalExpenses = getTotalExpenses();
  
  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: Math.round((amount / totalExpenses) * 100)
    }))
    .sort((a, b) => b.amount - a.amount);
};

