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
          <p className="text-muted-foreground font-mono">{stock.ticker}</p>
        </div>
      </div>

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
