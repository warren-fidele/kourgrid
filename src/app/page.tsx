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
import { ArrowRight, TrendingUp, TrendingDown, CircleDollarSign, BarChart3 } from 'lucide-react';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard() {
  const [gainers, losers, dividends] = await Promise.all([
    getTopGainers(),
    getTopLosers(),
    getTopDividendStocks(),
  ]);

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <BarChart3 className="h-6 w-6 text-primary mr-2" />
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Market Intelligence</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight lg:text-6xl text-balance">
          Master Your <span className="text-primary italic">Financial</span> Future
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Real-time insights into the top movers and high-yield dividend assets across global markets.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Gainers */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="h-1.5 w-full bg-green-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-black uppercase tracking-tight">Top Gainers</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-muted">
                    <TableHead className="font-bold">Ticker</TableHead>
                    <TableHead className="text-right font-bold">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gainers.map((stock) => (
                    <TableRow key={stock.ticker} className="group/row cursor-pointer transition-colors border-muted/30">
                      <TableCell className="font-mono font-black text-primary py-4">
                        <Link href={`/company/${stock.ticker}`} className="hover:underline bg-primary/5 px-2 py-1 rounded">
                          {stock.ticker}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right text-green-500 font-black text-lg">
                        +{stock.change.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Losers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="h-1.5 w-full bg-red-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-black uppercase tracking-tight">Top Losers</CardTitle>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-muted">
                    <TableHead className="font-bold">Ticker</TableHead>
                    <TableHead className="text-right font-bold">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {losers.map((stock) => (
                    <TableRow key={stock.ticker} className="group/row cursor-pointer transition-colors border-muted/30">
                      <TableCell className="font-mono font-black text-primary py-4">
                        <Link href={`/company/${stock.ticker}`} className="hover:underline bg-primary/5 px-2 py-1 rounded">
                          {stock.ticker}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right text-red-500 font-black text-lg">
                        {stock.change.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Best Dividends */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="h-1.5 w-full bg-blue-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-black uppercase tracking-tight">High Yield</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CircleDollarSign className="h-6 w-6 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-muted">
                    <TableHead className="font-bold">Ticker</TableHead>
                    <TableHead className="text-right font-bold">Yield</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dividends.map((stock) => (
                    <TableRow key={stock.ticker} className="group/row cursor-pointer transition-colors border-muted/30">
                      <TableCell className="font-mono font-black text-primary py-4">
                        <Link href={`/company/${stock.ticker}`} className="hover:underline bg-primary/5 px-2 py-1 rounded">
                          {stock.ticker}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right text-blue-500 font-black text-lg">
                        {stock.yield.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center pt-12"
      >
        <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-2xl hover:scale-105 transition-transform" asChild>
          <Link href="/stocks" className="flex items-center gap-3">
            Explore All Assets <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
