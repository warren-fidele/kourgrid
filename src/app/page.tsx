import Link from 'next/link';
import {
  getTopGainers,
  getTopLosers,
  getTopDividendStocks,
  getMostActiveStocks,
  getHighestValueStocks,
  getBestPEStocks,
  getLatestDataTimestamp
} from '@/lib/db';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronRight, Activity, Zap, Target, BarChart, Banknote, PieChart } from 'lucide-react';
import { formatValue, formatPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard() {
  const [gainers, losers, dividends, active, value, pe, latestTimestamp] = await Promise.all([
    getTopGainers(5),
    getTopLosers(5),
    getTopDividendStocks(5),
    getMostActiveStocks(5),
    getHighestValueStocks(5),
    getBestPEStocks(5),
    getLatestDataTimestamp()
  ]);

  const sections = [
    {
      title: 'Top Gainers',
      data: gainers,
      icon: Zap,
      color: 'text-emerald-400',
      field: 'change',
      format: (val: number) => formatValue(val, { prefix: '+' })
    },
    {
      title: 'Top Losers',
      data: losers,
      icon: Activity,
      color: 'text-rose-500',
      field: 'change',
      format: (val: number) => formatValue(val)
    },
    {
      title: 'Dividend Yield',
      data: dividends,
      icon: Target,
      color: 'text-amber-400',
      field: 'yield',
      format: (val: number) => formatPercentage(val)
    },
    {
      title: 'Most Active',
      data: active,
      icon: BarChart,
      color: 'text-blue-400',
      field: 'volume',
      format: (val: number) => formatValue(val, { abbrThreshold: 1000 })
    },
    {
      title: 'Top Value',
      data: value,
      icon: Banknote,
      color: 'text-cyan-400',
      field: 'value',
      format: (val: number) => formatValue(val, { abbrThreshold: 1000 })
    },
    {
      title: 'Best PE',
      data: pe,
      icon: PieChart,
      color: 'text-violet-400',
      field: 'pe',
      format: (val: number) => formatValue(val, { abbrThreshold: 1 })
    },
  ];

  return (
    <div className="container mx-auto p-4 flex flex-col space-y-4 min-h-0 h-full">
      <header className="flex items-end justify-between border-b border-white/5 pb-2">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">KourGrid</h1>
          <p className="text-sm text-muted-foreground">
            Mauritius Stock Exchange Analytics
          </p>
        </div>
        <div className="hidden sm:flex text-xs font-mono text-muted-foreground gap-4">
          <span>{latestTimestamp?.toLocaleDateString() || '—'}</span>
          <span>{latestTimestamp?.toLocaleTimeString() || '—'}</span>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 min-h-0 overflow-y-auto">
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col min-h-0"
          >
            <div className="flex items-center gap-2 mb-2 px-1">
              <section.icon className={`h-4 w-4 ${section.color}`} />
              <h2 className={`text-xs font-semibold tracking-wide ${section.color}`}>{section.title}</h2>
            </div>
            <Card className="border border-border bg-card overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {section.data.map((item: any) => (
                      <TableRow key={item.ticker} className="group border-b border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium text-sm py-3 px-4">
                          <Link href={`/company/${item.ticker}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                            <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                            <span className="font-mono text-primary">{item.ticker}</span>
                            <span className="text-muted-foreground">{item.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell className={`text-right font-semibold font-mono text-sm py-3 px-4 ${section.color}`}>
                          {section.format((item as any)[section.field])}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <footer className="flex justify-between items-center border-t border-border pt-2">
        <div className="text-xs font-mono text-muted-foreground">
          Data refreshed
        </div>
        <Link
          href="/stocks"
          className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Explore Stocks <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </footer>
    </div>
  );
}
