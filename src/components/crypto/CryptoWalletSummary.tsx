
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface WalletSummary {
  totalBalance: string;
  change24h: string;
  marketStatus: string;
  topPerformer: string;
  lastUpdated: string;
}

const CryptoWalletSummary = () => {
  const [walletData, setWalletData] = useState<WalletSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchWalletSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://maestro007.app.n8n.cloud/webhook-test/fintrix-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          timestamp: new Date().toISOString(),
          client: 'fintrix-app'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wallet summary');
      }

      const data = await response.json();
      
      // If API doesn't return expected format, use fallback data
      setWalletData({
        totalBalance: data.totalBalance || '$24,532.87',
        change24h: data.change24h || '+2.4%',
        marketStatus: data.marketStatus || 'Bullish',
        topPerformer: data.topPerformer || 'ETH +5.8%',
        lastUpdated: data.lastUpdated || new Date().toLocaleTimeString()
      });

      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching wallet summary:', error);
      toast.error('Failed to update wallet summary');
      
      // Use fallback data if API call fails
      if (!walletData) {
        setWalletData({
          totalBalance: '$24,532.87',
          change24h: '+2.4%',
          marketStatus: 'Bullish',
          topPerformer: 'ETH +5.8%',
          lastUpdated: new Date().toLocaleTimeString()
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletSummary();
    
    // Set up refresh interval for every 5 minutes
    const refreshInterval = setInterval(() => {
      fetchWalletSummary();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <Card className="bg-black/40 border-white/10 text-white mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg text-finance-chart flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          💼 Crypto Wallet Summary
        </CardTitle>
        <div className="flex items-center text-xs text-finance-gray">
          <span>Auto-refreshes every 5m</span>
          <button 
            onClick={fetchWalletSummary}
            disabled={loading}
            className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
            title="Refresh now"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {walletData ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-finance-gray">Total Balance</div>
              <div className="text-xl font-bold text-finance-chart">{walletData.totalBalance}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 p-3 rounded-lg">
                <div className="text-sm text-finance-gray">24h Change</div>
                <div className={`text-lg font-medium ${walletData.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {walletData.change24h}
                </div>
              </div>
              
              <div className="bg-black/30 p-3 rounded-lg">
                <div className="text-sm text-finance-gray">Market Status</div>
                <div className="text-lg font-medium text-finance-accent">{walletData.marketStatus}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <div className="text-finance-gray text-sm">Top Performer</div>
              <div className="text-green-400 font-medium">{walletData.topPerformer}</div>
            </div>
            
            <div className="text-xs text-finance-gray text-right">
              Last updated: {walletData.lastUpdated || lastRefresh.toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse flex space-x-2">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoWalletSummary;
