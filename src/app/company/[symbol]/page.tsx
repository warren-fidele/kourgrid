import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStockByTicker, getHistoricalPrices, getTradingData } from '@/lib/db';
import StockChart from '@/components/StockChart';
import StockDetails from '@/components/StockDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{stock.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-mono font-bold">{stock.ticker}</span>
            <span>•</span>
            <span>{stock.markets?.long_name ?? stock.markets?.name}</span>
            {stock.currencies && (
              <>
                <span>•</span>
                <span>{stock.currencies.name} ({stock.currencies.symbol ?? stock.currencies.code})</span>
              </>
            )}
          </div>
        </div>
      </div>

      {stock.markets?.description && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Market Context:</span> {stock.markets.description}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Historical Price Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <StockChart key={symbol} data={prices} />
          </CardContent>
        </Card>

        <StockDetails key={`details-${symbol}`} data={tradingData} />
      </div>
    </div>
  );
}
