import Link from 'next/link';
import {
  getTopGainers,
  getTopLosers,
  getTopDividendStocks,
  getMostActiveStocks,
  getHighestValueStocks,
  getBestPEStocks
} from '@/lib/db';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Activity, Zap, Target, BarChart, Banknote, PieChart } from 'lucide-react';
import * as motion from 'framer-motion/client';
import { formatValue, formatPercentage } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard() {
  const [gainers, losers, dividends, active, value, pe] = await Promise.all([
    getTopGainers(5),
    getTopLosers(5),
    getTopDividendStocks(5),
    getMostActiveStocks(5),
    getHighestValueStocks(5),
    getBestPEStocks(5)
  ]);

  const sections = [
    {
      title: 'Top_Gainers',
      data: gainers,
      icon: Zap,
      color: 'text-accent',
      format: (val: number) => formatValue(val, { prefix: '+' })
    },
    {
      title: 'Top_Losers',
      data: losers,
      icon: Activity,
      color: 'text-destructive',
      format: (val: number) => formatValue(val)
    },
    {
      title: 'High_Yield',
      data: dividends,
      icon: Target,
      color: 'text-primary',
      format: (val: number) => formatPercentage(val)
    },
    {
      title: 'Most_Active',
      data: active,
      icon: BarChart,
      color: 'text-blue-400',
      format: (val: number) => formatValue(val, { abbrThreshold: 1000 })
    },
    {
      title: 'Top_Value',
      data: value,
      icon: Banknote,
      color: 'text-emerald-400',
      format: (val: number) => formatValue(val, { abbrThreshold: 1000 })
    },
    {
      title: 'Best_PE',
      data: pe,
      icon: PieChart,
      color: 'text-orange-400',
      format: (val: number) => formatValue(val, { abbrThreshold: 1 }) // No abbreviation for PE
    },
  ];

  return (
    <div className="h-[calc(100vh-3.5rem)] container mx-auto p-4 flex flex-col space-y-4 overflow-hidden">
      <header className="flex items-end justify-between border-b border-white/5 pb-2">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-tighter uppercase font-mono">Market_Intelligence_Terminal</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            // High_Density_Analytics // System_Status: Nominal
          </p>
        </div>
        <div className="hidden sm:flex text-[10px] font-mono text-muted-foreground uppercase gap-4">
          <span>{new Date().toLocaleDateString()}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 min-h-0 overflow-hidden">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col min-h-0"
          >
            <div className="flex items-center gap-2 mb-1.5 px-1">
              <section.icon className={`h-3 w-3 ${section.color}`} />
              <h2 className={`text-[9px] font-mono font-black uppercase tracking-widest ${section.color}`}>{section.title}</h2>
            </div>
            <Card className="border border-white/5 bg-white/[0.02] overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {section.data.map((item: any) => (
                      <TableRow key={item.ticker} className="group border-b border-white/5 hover:bg-white/[0.05] transition-colors">
                        <TableCell className="font-mono font-bold text-[10px] py-2 px-3">
                          <Link href={`/company/${item.ticker}`} className="flex items-center gap-2">
                            <ChevronRight className="h-2 w-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                            {item.name} ({item.ticker})
                          </Link>
                        </TableCell>
                        <TableCell className={`text-right font-black font-mono text-[10px] py-2 px-3 ${section.color}`}>
                          {section.format(item[section.key] as number)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <footer className="flex justify-between items-center border-t border-white/5 pt-2">
        <div className="text-[9px] font-mono text-muted-foreground uppercase animate-pulse">
          // Data_Refresh_Cycle_Complete //
        </div>
        <Button variant="outline" size="sm" className="h-7 rounded-none font-mono text-[9px] uppercase border-white/10 hover:bg-white/5" asChild>
          <Link href="/stocks">Launch Full Terminal <ArrowRight className="h-3 w-3 ml-2" /></Link>
        </Button>
      </footer>
    </div>
  );
}
