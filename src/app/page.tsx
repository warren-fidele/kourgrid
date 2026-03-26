import Link from 'next/link';
import { getTopGainers, getTopLosers, getTopDividendStocks } from '@/lib/db';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, TrendingDown, CircleDollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard() {
  const [gainers, losers, dividends] = await Promise.all([
    getTopGainers(),
    getTopLosers(),
    getTopDividendStocks(),
  ]);

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <section className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Market Insights</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Quick summary of the top performing and dividend-paying assets in the market.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Gainers */}
        <Card className="border-t-4 border-t-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Top Gainers</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gainers.map((stock) => (
                  <TableRow key={stock.ticker} className="group cursor-pointer">
                    <TableCell className="font-mono font-bold">
                      <Link href={`/company/${stock.ticker}`} className="hover:underline">
                        {stock.ticker}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right text-green-600 font-bold">
                      +{stock.change.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card className="border-t-4 border-t-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Top Losers</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {losers.map((stock) => (
                  <TableRow key={stock.ticker} className="group cursor-pointer">
                    <TableCell className="font-mono font-bold">
                      <Link href={`/company/${stock.ticker}`} className="hover:underline">
                        {stock.ticker}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right text-red-600 font-bold">
                      {stock.change.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Best Dividends */}
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Best Dividends</CardTitle>
            <CircleDollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead className="text-right">Yield</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dividends.map((stock) => (
                  <TableRow key={stock.ticker} className="group cursor-pointer">
                    <TableCell className="font-mono font-bold">
                      <Link href={`/company/${stock.ticker}`} className="hover:underline">
                        {stock.ticker}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right text-blue-600 font-bold">
                      {(stock.yield * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-8">
        <Button size="lg" asChild>
          <Link href="/stocks" className="flex items-center gap-2">
            Browse All Stocks <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
