import { getStockByTicker, getHistoricalPrices, getTradingData } from '@/lib/db';
import StockChart from '@/components/StockChart';
import StockDetails from '@/components/StockDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, BadgeInfo } from 'lucide-react';
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

  const [prices, tradingData] = await Promise.all([
    getHistoricalPrices(stock.id),
    getTradingData(stock.id),
  ]);

  return (
    <div className="container mx-auto py-12 px-4 space-y-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center gap-6"
      >
        <Link href="/stocks">
          <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{stock.name}</h1>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-bold font-mono">
              {stock.ticker}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <span>{stock.markets?.long_name ?? stock.markets?.name}</span>
            </div>
            {stock.currencies && (
              <div className="flex items-center gap-1.5">
                <span className="text-primary">•</span>
                <span>{stock.currencies.name} ({stock.currencies.symbol ?? stock.currencies.code})</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {stock.markets?.description && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none bg-muted/30 backdrop-blur-sm shadow-sm overflow-hidden">
            <CardContent className="p-6 flex gap-4">
              <div className="mt-1">
                <BadgeInfo className="h-5 w-5 text-primary shrink-0" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Market Segment:</span> {stock.markets.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-md overflow-hidden">
            <CardHeader className="border-b border-muted/30 pb-6">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <StockChart key={symbol} data={prices} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StockDetails key={`details-${symbol}`} data={tradingData} />
        </motion.div>
      </div>
    </div>
  );
}
