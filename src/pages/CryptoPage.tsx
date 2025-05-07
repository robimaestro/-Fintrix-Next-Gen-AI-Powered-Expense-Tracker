
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
}

const initialCryptoData: CryptoAsset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.25,
    value: 12500,
    change: 2.4,
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 3.5,
    value: 7350,
    change: -1.2,
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    amount: 45,
    value: 4275,
    change: 5.7,
  },
];

const CryptoPage: React.FC = () => {
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(initialCryptoData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    symbol: '',
    amount: '',
    value: '',
  });

  const totalPortfolioValue = cryptoAssets.reduce((total, asset) => total + asset.value, 0);

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Crypto Portfolio</h1>
        <div className="text-4xl md:text-5xl font-bold text-finance-chart animate-pulse-glow">
          ${totalPortfolioValue.toLocaleString()}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {cryptoAssets.map(asset => (
          <Card key={asset.id} className="bg-black/40 border-white/10 text-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{asset.name}</CardTitle>
                <div className="bg-black/30 rounded-full p-2">
                  <Bitcoin className="h-5 w-5" />
                </div>
              </div>
              <CardDescription>{asset.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-finance-gray">Amount</p>
                  <p className="text-lg font-medium">{asset.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-finance-gray">Value</p>
                  <p className="text-lg font-medium">${asset.value.toLocaleString()}</p>
                  <div className={`flex items-center gap-1 text-xs ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    <span>{asset.change}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card 
          className="bg-black/40 border-white/10 text-white flex flex-col items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => setShowAddForm(true)}
        >
          <CardContent className="flex flex-col items-center justify-center h-full py-8">
            <Plus className="h-10 w-10 mb-2 text-finance-chart" />
            <p className="text-finance-gray">Add Crypto</p>
          </CardContent>
        </Card>
      </div>

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
