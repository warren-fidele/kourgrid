import { getStockByTicker, getChartData, getTradingData } from '@/lib/db';
import StockChart from '@/components/StockChart';
import StockDetails from '@/components/StockDetails';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, Info } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    symbol: string;
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { symbol } = await params;
  const stock = await getStockByTicker(symbol);

  if (!stock) {
    notFound();
  }

  const [chartData, tradingData] = await Promise.all([
    getChartData(stock.id),
    getTradingData(stock.id),
  ]);

  return (
    <div className="h-[calc(100vh-3.5rem)] container mx-auto p-4 flex flex-col space-y-4 overflow-hidden">
      {/* HUD Header */}
      <header className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-4">
          <Link href="/stocks">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none hover:bg-white/5">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold uppercase tracking-tight font-mono">{stock.name}</h1>
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase">
              <span className="text-primary font-black">{stock.ticker}</span>
              <span>//</span>
              <Globe className="h-3 w-3" />
              <span>{stock.markets?.name}</span>
              <span>//</span>
              <span>{stock.currencies?.code} ({stock.currencies?.symbol})</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Analytics Section */}
        <div className="lg:col-span-8 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary">Performance_Analytics</span>
          </div>
          <Card className="flex-grow border border-white/5 bg-white/[0.02] min-h-0 overflow-hidden">
            <CardContent className="p-4 h-full">
              <StockChart key={symbol} data={chartData} />
            </CardContent>
          </Card>
          
          {stock.markets?.description && (
            <div className="mt-4 p-3 bg-white/[0.02] border border-white/5">
              <p className="text-[10px] font-mono text-muted-foreground leading-relaxed uppercase">
                <span className="text-foreground font-bold">[Market_Intel]</span> {stock.markets.description}
              </p>
            </div>
          )}
        </div>

        {/* Fundamental HUD */}
        <div className="lg:col-span-4 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary">System_Fundamentals</span>
          </div>
          <div className="flex-grow min-h-0 overflow-y-auto scrollbar-hide">
            <StockDetails key={`details-${symbol}`} data={tradingData} />
          </div>
        </div>
      </div>
    </div>
  );
}
