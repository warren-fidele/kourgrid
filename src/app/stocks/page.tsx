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
    <div className="container mx-auto p-3 sm:p-4 flex flex-col min-h-0 md:h-full">
      <div className="flex flex-col min-h-0 md:flex-grow md:overflow-y-auto">
        <StockList
          initialStocks={stocks}
          markets={markets}
          currencies={currencies}
        />
      </div>
    </div>
  );
}
