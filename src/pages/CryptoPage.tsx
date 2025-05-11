import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  EyeOff,
  Bitcoin,
  ChevronRight,
  BarChart3,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";
import CryptoWalletSummary from '@/components/crypto/CryptoWalletSummary';

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  allocation: number;
  icon?: React.ReactNode;
}

const initialCryptoData: CryptoAsset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.25,
    value: 12500,
    change: 2.4,
    allocation: 51,
    icon: <Bitcoin className="h-6 w-6 text-orange-500" />
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 3.5,
    value: 7350,
    change: -1.2,
    allocation: 30,
    icon: <svg className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4.5 12.5L12 16.5L19.5 12.5L12 2Z" fill="currentColor" />
      <path d="M12 16.5V22L19.5 12.5L12 16.5Z" fill="currentColor" opacity="0.6" />
      <path d="M12 16.5L4.5 12.5L12 22V16.5Z" fill="currentColor" opacity="0.6" />
    </svg>
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    amount: 45,
    value: 4275,
    change: 5.7,
    allocation: 19,
    icon: <svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 14.5L16 8.5M6 8.5H16L18 10.5L16 12.5H6L4 10.5L6 8.5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M6 16.5H16L18 14.5L16 12.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  },
];

const chartData = [
  { date: 'May 1', value: 2750 },
  { date: 'May 2', value: 2800 },
  { date: 'May 3', value: 2780 },
  { date: 'May 4', value: 2790 },
  { date: 'May 5', value: 2840 },
  { date: 'May 6', value: 2820 },
  { date: 'May 7', value: 2865 },
  { date: 'May 8', value: 2830 },
  { date: 'May 9', value: 2780 },
  { date: 'May 10', value: 2750 },
  { date: 'May 11', value: 2710 },
  { date: 'May 12', value: 2700 },
  { date: 'May 13', value: 2720 },
  { date: 'May 14', value: 2745 },
];

const financeTips = [
  {
    id: '1',
    title: 'Portfolio Rebalancing',
    description: 'SOL has gained 5.7% this week — consider rebalancing your portfolio allocation.',
    category: 'optimization'
  },
  {
    id: '2',
    title: 'Market Insight',
    description: 'Your portfolio has outperformed BTC by 3.2% this month. Consider maintaining your current strategy.',
    category: 'performance'
  },
  {
    id: '3',
    title: 'Risk Management',
    description: 'Your portfolio volatility is higher than average. Consider diversifying with some stablecoins.',
    category: 'risk'
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-2 text-xs">
        <p className="text-finance-chart font-semibold">{label}</p>
        <p className="text-white">€{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const getPerformanceIndicator = (value: number) => {
  if (value === 0) return 'neutral';
  return value > 0 ? 'positive' : 'negative';
};

const CryptoPage: React.FC = () => {
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(initialCryptoData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hideValue, setHideValue] = useState(false);
  const [timeRange, setTimeRange] = useState('1D');
  const [newAsset, setNewAsset] = useState({
    name: '',
    symbol: '',
    amount: '',
    value: '',
  });

  const totalPortfolioValue = cryptoAssets.reduce((total, asset) => total + asset.value, 0);
  const dailyChangePercent = 1.59; // Hardcoded for demo
  const weeklyChangePercent = 2.84; // Hardcoded for demo
  const monthlyChangePercent = -0.92; // Hardcoded for demo

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.symbol || !newAsset.amount || !newAsset.value) {
      toast.error("Please fill in all fields");
      return;
    }

    const amount = parseFloat(newAsset.amount);
    const value = parseFloat(newAsset.value);

    if (isNaN(amount) || isNaN(value)) {
      toast.error("Amount and value must be valid numbers");
      return;
    }

    const id = (cryptoAssets.length + 1).toString();
    setCryptoAssets([
      ...cryptoAssets,
      {
        id,
        name: newAsset.name,
        symbol: newAsset.symbol.toUpperCase(),
        amount,
        value,
        change: 0,
        allocation: Math.round((value / (totalPortfolioValue + value)) * 100),
        icon: <Bitcoin className="h-6 w-6 text-gray-400" />
      }
    ]);

    setNewAsset({
      name: '',
      symbol: '',
      amount: '',
      value: '',
    });
    
    setShowAddForm(false);
    toast.success("Crypto asset added successfully");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header Section - Summary Card */}
      <div className="bg-black/30 rounded-xl p-6 mb-6 border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-finance-chart">Investments Overview</h1>
          <button 
            onClick={() => setHideValue(!hideValue)} 
            className="text-finance-gray hover:text-finance-chart transition-colors"
          >
            {hideValue ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-finance-chart">
              {hideValue ? '••••••' : `€${totalPortfolioValue.toLocaleString()}`}
            </div>
            <div className="flex gap-2 mt-2">
              <div className={`flex items-center text-sm px-2 py-1 rounded-full ${dailyChangePercent >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {dailyChangePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span>{dailyChangePercent}% 1D</span>
              </div>
              <div className={`flex items-center text-sm px-2 py-1 rounded-full ${weeklyChangePercent >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {weeklyChangePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span>{weeklyChangePercent}% 7D</span>
              </div>
              <div className={`flex items-center text-sm px-2 py-1 rounded-full ${monthlyChangePercent >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {monthlyChangePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span>{monthlyChangePercent}% 30D</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="bg-finance-accent/20 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-finance-accent" />
            </div>
            <div className="text-sm text-finance-gray">
              <div className="font-semibold text-white">Portfolio Allocation</div>
              <div>Diversified across {cryptoAssets.length} assets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto Wallet Summary */}
      <CryptoWalletSummary />

      {/* Chart Section - Interactive Performance Chart */}
      <Card className="bg-black/40 border-white/10 text-white mb-6 overflow-hidden">
        <CardHeader className="pb-0 pt-6">
          <CardTitle className="text-lg text-finance-chart">Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              {timeRange === '1D' || timeRange === '7D' ? (
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <XAxis 
                    dataKey="date" 
                    hide={true}
                  />
                  <YAxis 
                    domain={['dataMin - 20', 'dataMax + 20']}
                    hide={true}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={chartData[chartData.length - 1].value}
                    stroke="#FFFFFF"
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0FA0CE"
                    strokeWidth={2}
                    dot={false}
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
              ) : (
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <XAxis 
                    dataKey="date" 
                    hide={true}
                  />
                  <YAxis 
                    domain={['dataMin - 20', 'dataMax + 20']}
                    hide={true}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0FA0CE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0FA0CE" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0FA0CE" 
                    strokeWidth={2}
                    fill="url(#colorValue)"
                    activeDot={{ 
                      stroke: '#0FA0CE', 
                      strokeWidth: 2, 
                      r: 6, 
                      fill: '#0FA0CE',
                      className: 'animate-pulse-glow'
                    }}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
          
          <Tabs 
            defaultValue="1D" 
            value={timeRange} 
            onValueChange={setTimeRange}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-4 bg-black/30">
              <TabsTrigger value="1D" className="data-[state=active]:bg-finance-chart data-[state=active]:text-black">1D</TabsTrigger>
              <TabsTrigger value="7D" className="data-[state=active]:bg-finance-chart data-[state=active]:text-black">7D</TabsTrigger>
              <TabsTrigger value="30D" className="data-[state=active]:bg-finance-chart data-[state=active]:text-black">30D</TabsTrigger>
              <TabsTrigger value="1Y" className="data-[state=active]:bg-finance-chart data-[state=active]:text-black">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Asset List - Individual Asset Cards */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Bitcoin className="h-5 w-5 text-finance-chart" />
          Asset Allocation
        </h2>
        
        {cryptoAssets.map((asset) => (
          <Card 
            key={asset.id} 
            className="bg-black/40 border-white/10 text-white overflow-hidden"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3">
                    {asset.icon}
                  </div>
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-finance-gray">
                      {asset.amount} {asset.symbol}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">
                    {hideValue ? '••••••' : `€${asset.value.toLocaleString()}`}
                  </div>
                  <div className={`flex items-center justify-end text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span>{asset.change}%</span>
                  </div>
                </div>
              </div>
              
              {/* Allocation visualization */}
              <div className="mt-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-finance-gray">Allocation</span>
                  <span className="font-medium">{asset.allocation}%</span>
                </div>
                <Progress 
                  value={asset.allocation} 
                  className="h-2 bg-white/10" 
                  indicatorClassName={`bg-gradient-to-r from-finance-chart to-finance-accent`}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          className="w-full bg-black/40 border border-white/10 hover:bg-black/60 text-finance-chart flex items-center justify-center mt-6"
          onClick={() => setShowAddForm(true)}
        >
          <span className="mr-1">+</span> Add New Asset
        </Button>
      </div>

      {/* Smart Finance Tips */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Info className="h-5 w-5 text-finance-chart" />
          Smart Finance Tips
        </h2>
        
        {financeTips.map((tip) => {
          const categoryStyles = {
            'optimization': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'performance': 'bg-green-500/20 text-green-400 border-green-500/30',
            'risk': 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          }[tip.category];
          
          return (
            <Card key={tip.id} className="border-white/10 bg-black/30">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-full ${tip.category === 'optimization' ? 'bg-blue-500/20' : tip.category === 'performance' ? 'bg-green-500/20' : 'bg-amber-500/20'}`}>
                      {tip.category === 'optimization' ? (
                        <BarChart3 className={`h-5 w-5 ${tip.category === 'optimization' ? 'text-blue-400' : tip.category === 'performance' ? 'text-green-400' : 'text-amber-400'}`} />
                      ) : tip.category === 'performance' ? (
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      ) : (
                        <Info className="h-5 w-5 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{tip.title}</h3>
                      <p className="text-sm text-finance-gray">{tip.description}</p>
                    </div>
                  </div>
                  <Badge className={categoryStyles}>
                    {tip.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Asset Form Modal */}
      {showAddForm && (
        <Card className="bg-black/40 border-white/10 text-white mb-6">
          <CardHeader>
            <CardTitle>Add New Crypto Asset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Asset Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Bitcoin" 
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input 
                    id="symbol" 
                    placeholder="BTC" 
                    value={newAsset.symbol}
                    onChange={(e) => setNewAsset({...newAsset, symbol: e.target.value})}
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    step="any"
                    placeholder="0.05" 
                    value={newAsset.amount}
                    onChange={(e) => setNewAsset({...newAsset, amount: e.target.value})}
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value (€)</Label>
                  <Input 
                    id="value" 
                    type="number" 
                    step="any"
                    placeholder="1000" 
                    value={newAsset.value}
                    onChange={(e) => setNewAsset({...newAsset, value: e.target.value})}
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="border-white/10 text-white hover:bg-black/50"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddAsset}
                  className="bg-finance-chart hover:bg-finance-chart/80 text-black"
                >
                  Add Asset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CryptoPage;
