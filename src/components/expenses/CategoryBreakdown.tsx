
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getCategoryExpenses, getCategoryIcon } from '@/lib/expenseUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const COLORS = ['#0FA0CE', '#7E69AB', '#F97316', '#D946EF', '#0EA5E9', '#8B5CF6', '#33C3F0', '#FEC6A1'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-finance-chart font-semibold capitalize">{data.category}</p>
        <p className="text-white">${data.amount} ({data.percentage}%)</p>
      </div>
    );
  }
  return null;
};

const CategoryBreakdown: React.FC = () => {
  const categoryExpenses = getCategoryExpenses();
  
  return (
    <div className="glass-card rounded-xl overflow-hidden mb-6">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Spending by Category</h2>
      </div>
      
      <div className="md:flex">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryExpenses}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {categoryExpenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 p-4 max-h-64 overflow-y-auto scrollbar-none">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryExpenses.map((item, index) => (
                <TableRow key={index} className="border-white/10">
                  <TableCell className="capitalize flex items-center gap-2">
                    <span className="text-xl">{getCategoryIcon(item.category)}</span>
                    {item.category}
                  </TableCell>
                  <TableCell className="text-right font-mono">${item.amount}</TableCell>
                  <TableCell className="text-right font-mono">{item.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;
