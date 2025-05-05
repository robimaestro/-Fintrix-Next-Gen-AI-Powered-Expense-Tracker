
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getMonthlyExpenses, MonthlyExpenses } from '@/lib/expenseUtils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-2 text-xs">
        <p className="text-finance-chart font-semibold">{label}</p>
        <p className="text-white">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ExpensesChart: React.FC = () => {
  const monthlyExpenses = getMonthlyExpenses();
  
  const getMaxValue = () => {
    if (monthlyExpenses.length === 0) return 100;
    const max = Math.max(...monthlyExpenses.map(item => item.total));
    return Math.ceil(max / 100) * 100; // Round up to the nearest 100
  };
  
  // Find the latest month for reference line
  const latestMonth = monthlyExpenses.length > 0 ? 
    monthlyExpenses[monthlyExpenses.length - 1].month : '';

  return (
    <div className="glass-card p-4 h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={monthlyExpenses}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8E9196', fontSize: 12 }}
          />
          <YAxis 
            domain={[0, getMaxValue()]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8E9196', fontSize: 12 }}
            width={40}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine 
            x={latestMonth} 
            stroke="#FFFFFF" 
            strokeDasharray="3 3" 
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#0FA0CE"
            strokeWidth={2}
            dot={{ stroke: '#0FA0CE', strokeWidth: 2, r: 4, fill: '#1A1F2C' }}
            activeDot={{ 
              stroke: '#0FA0CE', 
              strokeWidth: 2, 
              r: 6, 
              fill: '#0FA0CE',
              className: 'animate-pulse-glow'
            }}
            className="chart-line"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesChart;
