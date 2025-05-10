
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
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  stakingAvailable?: boolean;
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
    stakingAvailable: false,
    icon: <Bitcoin className="h-6 w-6 text-orange-500" />
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 3.5,
    value: 7350,
    change: -1.2,
    stakingAvailable: true,
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
    stakingAvailable: true,
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

  const handleStartStaking = (assetName: string) => {
    toast.success(`Started staking process for ${assetName}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Investments Overview</h1>
          <button 
            onClick={() => setHideValue(!hideValue)} 
            className="text-finance-gray hover:text-finance-chart transition-colors"
          >
            {hideValue ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <div className="flex items-center">
          <div className="text-3xl md:text-4xl font-bold text-finance-chart">
            {hideValue ? '••••••' : `€${totalPortfolioValue.toLocaleString()}`}
          </div>
          <div className={`ml-3 flex items-center text-sm px-2 py-1 rounded-full ${dailyChangePercent >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
            {dailyChangePercent >= 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{dailyChangePercent}% in 1 day</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <Card className="bg-black/40 border-white/10 text-white mb-6">
        <CardContent className="p-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
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
              <TabsTrigger value="1A" className="data-[state=active]:bg-finance-chart data-[state=active]:text-black">1A</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Asset List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Assets</h2>
        
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
              
              {/* Mini trendline visualization */}
              <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${asset.change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(asset.change) * 5, 100)}%` }}
                ></div>
              </div>
              
              {asset.stakingAvailable && (
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-finance-gray">
                    Earn {(Math.random() * 5 + 1).toFixed(2)}% per year
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-finance-chart hover:bg-finance-chart/10"
                    onClick={() => handleStartStaking(asset.name)}
                  >
                    Start Staking
                  </Button>
                </div>
              )}
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
                  <Label htmlFor="value">Value ($)</Label>
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
