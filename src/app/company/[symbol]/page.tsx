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
    <div className="container mx-auto p-3 sm:p-4 flex flex-col space-y-3 sm:space-y-4 min-h-0 md:h-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-4">
          <Link href="/stocks">
            <Button
              variant="ghost"
              size="sm"
              className="h-11 w-11 p-0 rounded-md hover:bg-muted md:h-9 md:w-9"
              aria-label="Back to stocks"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold tracking-tight">{stock.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono font-medium text-primary">{stock.ticker}</span>
              <span className="text-muted-foreground/50">|</span>
              <Globe className="h-3.5 w-3.5" />
              <span>{stock.markets?.name}</span>
              <span className="text-muted-foreground/50">|</span>
              <span>{stock.currencies?.code} ({stock.currencies?.symbol})</span>
            </div>
          </div>
        </div>
      </header>

      <div className="md:flex-grow md:overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Analytics Section */}
          <div className="lg:col-span-8 flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Performance Analytics</span>
            </div>
            <Card className="border border-border bg-card min-h-0">
              <CardContent className="p-3 sm:p-4 h-full min-h-[50vh] md:min-h-0">
                <StockChart key={symbol} data={chartData} />
              </CardContent>
            </Card>

            {stock.markets?.description && (
              <div className="mt-4 p-3 sm:p-4 bg-muted/30 border border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Market Intel:</span> {stock.markets.description}
                </p>
              </div>
            )}
          </div>

          {/* Fundamentals Section */}
          <div className="lg:col-span-4 flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Fundamentals</span>
            </div>
            <div className="flex-grow min-h-0 overflow-y-auto scrollbar-thin">
              <StockDetails key={`details-${symbol}`} data={tradingData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
