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
import { ArrowRight, ChevronRight, Activity, Zap, Target } from 'lucide-react';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard() {
  const [gainers, losers, dividends] = await Promise.all([
    getTopGainers(6),
    getTopLosers(6),
    getTopDividendStocks(6),
  ]);

  return (
    <div className="h-[calc(100vh-3.5rem)] container mx-auto p-4 flex flex-col space-y-4">
      <header className="flex items-end justify-between border-b border-white/5 pb-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tighter uppercase font-mono">Market_Intelligence_Terminal</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            // Real-time Analytics // System Status: Nominal
          </p>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase flex gap-4">
          <span>{new Date().toLocaleDateString()}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Top Gainers */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-accent" />
            <h2 className="text-[10px] font-mono font-black uppercase tracking-widest text-accent">Top_Gainers</h2>
          </div>
          <Card className="flex-grow border border-white/5 bg-white/[0.02] min-h-0 overflow-hidden">
            <CardContent className="p-0 h-full overflow-y-auto scrollbar-hide">
              <Table>
                <TableBody>
                  {gainers.map((stock) => (
                    <TableRow key={stock.ticker} className="group border-b border-white/5 hover:bg-accent/10 transition-colors">
                      <TableCell className="font-mono font-bold text-[11px] py-3">
                        <Link href={`/company/${stock.ticker}`} className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3 text-accent opacity-0 group-hover:opacity-100 transition-all" />
                          {stock.ticker}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right text-accent font-black font-mono text-xs">
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-destructive" />
            <h2 className="text-[10px] font-mono font-black uppercase tracking-widest text-destructive">Top_Losers</h2>
          </div>
          <Card className="flex-grow border border-white/5 bg-white/[0.02] min-h-0 overflow-hidden">
            <CardContent className="p-0 h-full overflow-y-auto scrollbar-hide">
              <Table>
                <TableBody>
                  {losers.map((stock) => (
                    <TableRow key={stock.ticker} className="group border-b border-white/5 hover:bg-destructive/10 transition-colors">
                      <TableCell className="font-mono font-bold text-[11px] py-3">
                        <Link href={`/company/${stock.ticker}`} className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3 text-destructive opacity-0 group-hover:opacity-100 transition-all" />
                          {stock.ticker}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right text-destructive font-black font-mono text-xs">
                        {stock.change.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* High Yield */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary">High_Yield</h2>
          </div>
          <Card className="flex-grow border border-white/5 bg-white/[0.02] min-h-0 overflow-hidden">
            <CardContent className="p-0 h-full overflow-y-auto scrollbar-hide">
              <Table>
                <TableBody>
                  {dividends.map((stock) => (
                    <TableRow key={stock.ticker} className="group border-b border-white/5 hover:bg-primary/10 transition-colors">
                      <TableCell className="font-mono font-bold text-[11px] py-3">
                        <Link href={`/company/${stock.ticker}`} className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                          {stock.ticker}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right text-primary font-black font-mono text-xs">
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

      <footer className="flex justify-end gap-2 border-t border-white/5 pt-4">
        <Button variant="outline" size="sm" className="rounded-none font-mono text-[10px] uppercase border-white/10 hover:bg-white/5" asChild>
          <Link href="/stocks">Launch Full Terminal <ArrowRight className="h-3 w-3 ml-2" /></Link>
        </Button>
      </footer>
    </div>
  );
}
