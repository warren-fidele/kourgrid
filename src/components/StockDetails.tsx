import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BadgeInfo, TrendingUp, TrendingDown, DollarSign, Ratio, Percent, Landmark } from 'lucide-react';
import * as motion from 'framer-motion/client';

interface TradingData {
  high_52w: number | null;
  low_52w: number | null;
  eps: number | null;
  dps: number | null;
  nav: number | null;
  pe_ratio: number | null;
  dividend_yield: number | null;
  price_to_nav: number | null;
}

export default function StockDetails({ data }: { data: TradingData | null }) {
  if (!data) {
    return (
      <Card className="border-none shadow-lg bg-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeInfo className="h-5 w-5 text-muted-foreground" />
            Fundamental Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground italic">No fundamental data available for this asset.</p>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    { label: '52W High', value: data.high_52w?.toFixed(2), icon: TrendingUp, color: 'text-green-500' },
    { label: '52W Low', value: data.low_52w?.toFixed(2), icon: TrendingDown, color: 'text-red-500' },
    { label: 'EPS', value: data.eps?.toFixed(2), icon: Landmark, color: 'text-blue-500' },
    { label: 'DPS', value: data.dps?.toFixed(2), icon: DollarSign, color: 'text-emerald-500' },
    { label: 'P/E Ratio', value: data.pe_ratio?.toFixed(2), icon: Ratio, color: 'text-orange-500' },
    { label: 'Div. Yield', value: data.dividend_yield ? `${data.dividend_yield.toFixed(2)}%` : null, icon: Percent, color: 'text-indigo-500' },
    { label: 'NAV', value: data.nav?.toFixed(2), icon: Landmark, color: 'text-violet-500' },
    { label: 'Price to NAV', value: data.price_to_nav?.toFixed(2), icon: Ratio, color: 'text-amber-500' },
  ];

  return (
    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-md overflow-hidden">
      <CardHeader className="border-b border-muted/30 pb-6">
        <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
          Company Fundamentals
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.label} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md bg-muted/50 group-hover:bg-primary/10 transition-colors ${metric.color}`}>
                  <metric.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </span>
              </div>
              <span className="text-2xl font-black tracking-tighter">
                {metric.value ?? '—'}
              </span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
