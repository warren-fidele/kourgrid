import { getStocks, getMarkets, getCurrencies } from '@/lib/db';
import StockList from '@/components/StockList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function StocksPage() {
  const [stocks, markets, currencies] = await Promise.all([
    getStocks(),
    getMarkets(),
    getCurrencies(),
  ]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Market Directory</h1>
        <p className="text-muted-foreground">
          Browse and search through all available companies across different markets.
        </p>
      </div>

      <StockList 
        initialStocks={stocks} 
        markets={markets} 
        currencies={currencies} 
      />
    </div>
  );
}
