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
    getTopGainers(),
    getTopLosers(),
    getTopDividendStocks(),
  ]);

  return (
    <div className="container mx-auto py-16 px-4 space-y-20">
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-left space-y-8 relative"
      >
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary animate-pulse">
            Neural Network Online // Status: Optimized
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">
          Forge Your <br />
          <span className="text-primary text-glow">Future</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-xl border-l-2 border-white/10 pl-6">
          High-velocity market data terminal for the next generation of asset commanders. 
          Analyze. Strategize. Execute.
        </p>

        <div className="flex gap-4">
          <Button size="lg" className="rounded-none font-mono font-bold tracking-widest uppercase h-14 px-8 glow-primary" asChild>
            <Link href="/stocks">Launch Terminal</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-none font-mono font-bold tracking-widest uppercase h-14 px-8 border-white/20 hover:bg-white/5" asChild>
            <Link href="/about">System Intel</Link>
          </Button>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 px-1 bg-white/5 border border-white/10">
        {/* Top Gainers */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-background p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Zap className="h-4 w-4" /> Velocity Boost
            </h2>
            <span className="text-[10px] font-mono text-white/20">MNTR_01</span>
          </div>
          <Table>
            <TableBody>
              {gainers.map((stock) => (
                <TableRow key={stock.ticker} className="group border-none hover:bg-primary/5 transition-all">
                  <TableCell className="font-mono font-bold py-4">
                    <Link href={`/company/${stock.ticker}`} className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {stock.ticker}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right text-primary font-black font-mono">
                    +{stock.change.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Top Losers */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-background p-6 space-y-6 lg:border-x lg:border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-black uppercase tracking-widest text-destructive flex items-center gap-2">
              <Activity className="h-4 w-4" /> System Drag
            </h2>
             <span className="text-[10px] font-mono text-white/20">MNTR_02</span>
          </div>
          <Table>
            <TableBody>
              {losers.map((stock) => (
                <TableRow key={stock.ticker} className="group border-none hover:bg-destructive/5 transition-all">
                  <TableCell className="font-mono font-bold py-4">
                    <Link href={`/company/${stock.ticker}`} className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-destructive opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {stock.ticker}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right text-destructive font-black font-mono">
                    {stock.change.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Best Dividends */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-background p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-black uppercase tracking-widest text-accent flex items-center gap-2">
              <Target className="h-4 w-4" /> Yield Target
            </h2>
            <span className="text-[10px] font-mono text-white/20">MNTR_03</span>
          </div>
          <Table>
            <TableBody>
              {dividends.map((stock) => (
                <TableRow key={stock.ticker} className="group border-none hover:bg-accent/5 transition-all">
                  <TableCell className="font-mono font-bold py-4">
                    <Link href={`/company/${stock.ticker}`} className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-accent opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {stock.ticker}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right text-accent font-black font-mono">
                    {stock.yield.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}
