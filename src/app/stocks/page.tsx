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
    <div className="h-[calc(100vh-3.5rem)] container mx-auto p-4 flex flex-col min-h-0">
      <StockList 
        initialStocks={stocks} 
        markets={markets} 
        currencies={currencies} 
      />
    </div>
  );
}
